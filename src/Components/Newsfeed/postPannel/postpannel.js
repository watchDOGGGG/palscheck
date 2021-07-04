import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AdjustIcon from '@material-ui/icons/Adjust';
import CreateIcon from '@material-ui/icons/Create';
import { Modal} from 'antd';
import '../newsfeed.css'
import CreateFeed from '../../Dashboard/Create/feed'
const useStyles = makeStyles((theme) => ({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    exampleWrapper: {
      position: 'relative',
      marginTop: theme.spacing(3),
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  }));
  
  
  
  export default function SpeedDials({ProfileImg,fullname}) {
    const classes = useStyles();
    const [direction] = React.useState('right');
    const [open, setOpen] = React.useState(false);
    const [hidden] = React.useState(false);
    const [visible,setVisible] = React.useState(false)
    const [modalRoute,setmodalRoute] = React.useState(0)

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    
    const showModal = () => {
      setVisible(true);
    };
   
 
    const handleCancel = e => {
      setVisible(false);
    };
  const UpdatePostModal = (e)=>{
    setVisible(false)
  }

  const UpdateRoute = (route)=>{
    setmodalRoute(route)
    showModal()
  }
 const actions = [
    { icon: <AdjustIcon onClick={e=>UpdateRoute(1)}/>, name: 'Create feed' },
  ];

    return (
      <div className={classes.root,'fixed feed-pp'}>
        <div className={classes.exampleWrapper}>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            hidden={hidden}
            icon={<CreateIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={direction}
          >

            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClose}
              />
              
            ))}
          </SpeedDial>
        </div>
        {/* palsfeed modal */}
        <Modal
          visible={visible}
          onCancel={handleCancel}
          width={
          modalRoute === 1?
          500
          :modalRoute === 2?
          1000
          :modalRoute === 3?
          500
          :500
          }
          footer={[
            
          ]}
        >
          {
            modalRoute === 1 ?
              <CreateFeed ProfileImg={ProfileImg} fullname={fullname}/>
            :null
          }
          
        </Modal>
      </div>
    );
  }


import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const DeleteFeed = ({address,posteby}) =>{
  
    const confirm = () =>{
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: <p className="f-name">you are about to delete this feed!</p>,
    okText: <span onClick={Del}>Delete</span>,
    cancelText: 'Cancel',
  });
}
const Del = async()=>{
    const DeleteUserFeed = await fetch(`${SeverLink}/Feed/DeletePost/${address}/${posteby}`,{
        headers:{token:localStorage.token}
    })
    const result = await DeleteUserFeed.json()
   
}
return(
  <Space>
    <div class="flex f6 fw1"onClick={confirm} ><DeleteOutlinedIcon/><span className="ml2">Delete this post</span></div>
      
  </Space>
);
}


export default DeleteFeed
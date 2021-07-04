import React, { useEffect, useState } from 'react'
import '../profile.css'
import {FlagOutlined,GlobalOutlined} from '@ant-design/icons';
import { Row, Col ,Avatar} from 'antd';
import Memo from '../../Memo/sendmemo.jsx'
import DefaultImg from '../../Dashboard/Defaults/defaultImage'
import {Modal} from 'antd';
import Followers from '../Followers/followers.jsx'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CreateIcon from '@material-ui/icons/Create';

const SeverLink = 'http://localhost:4000'

const ProfileCard = ({ fullname, username, profileimg, editroute,id,country,region,status,website }) => {

    const [following,setfollowingCount] = useState([])
    const [followers,setfollowersCount] = useState([])
    const [isLoggedIn,setisLoggedin] = useState([])
    const [visible,setVisible] = React.useState(false)

    useEffect(()=>{
        GetFollowingCount()
        GetFollowersCount()
        getLoggedInUser()
    })
      const showModal = () => {
        setVisible(true);
      };
 
      const handleCancel = e => {
        setVisible(false);
      };
//getLoggedInuser
    const getLoggedInUser = async()=>{
    const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
        headers:{token:localStorage.token}
    })
    const response = await getLogginUser.json()
    setisLoggedin(response.loggedIn)
}
    //following GetPollCount
    const GetFollowingCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/countfollowing/${id}`)
        const response = await fetchAll.json()
        if(response.count){
            setfollowingCount(response.count)
        }
    }
    //followers count
    const GetFollowersCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/countfollowers/${id}`)
        const response = await fetchAll.json()
        if(response.count){
            setfollowersCount(response.count)
        }
    }
 
  
    return(
        <article className="center pa3 pa4-ns b--black-10 ">
        <div className="tc profile palscheck-p3 pa3">
            {
                profileimg?
                <Avatar className="br-100 pa1 ba b--black-10 h3 w3" src={profileimg} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}/>
                :
                <DefaultImg name={fullname} size={80}/>
            }
           
                <span className="f6 db f-name" id="usnfe78">{fullname}</span>
                <span className="f6 db profile-cardUsername f-name2">@{username}</span>
            </div>
            <div class="flex profile-card">
                {
                    isLoggedIn === id ?
                    null:
                    isLoggedIn !== id?
                            <div class="w-20 h2 ml1 lh-copy pa1 br4 notifyBackground hover-bg-blue tc white">
                                <Memo username={fullname}
                                    userid={id}
                                />
                            </div>
                            : null
                }

                {
                    isLoggedIn !== id ?
                        null :
                    isLoggedIn === id ?
                    <div class=" w-20 h2 ml1 lh-copy pa1 br4 notifyBackground hover-bg-blue tc  f-name" >
                <span className=" f6  pointer" onClick={editroute}><MonetizationOnIcon />
                                </span>
                            </div>
                            : null
                }

            </div>
            <div className="db f-name newfeed--3-art br3 pa1">
                {/* location */}

                {/* address */}
                <div className="lh-copy measure center f5  dib ttc tc br b pa1"><span className=""><FlagOutlined /> </span>{country} ,&nbsp;&nbsp;{region}</div>
                <div className="lh-copy center f5  dib ttc tc br b pa1"><span className="ml3"><GlobalOutlined /> </span><a href={`https://${website}`} className="f-name2">{website}</a></div>

                {/* status */}
                <div className="mystatus mt3 db">
                    <div className="fw6 b f5 underline">Status {isLoggedIn !== id ?null:<div className="ml5 dib tr"><a href="/settings" className="underline link dim f6 flex">edit<CreateIcon/></a></div>}</div>
                    <div className="statusD3p w-auto">
                        <p>{status}</p>
                    </div>
                </div>
                
           <div className="mt4 fw4 center tc pa2 tc w-80">
               
               <Row gutter={16}>
                   <Col span={4} onClick={showModal} className="pointer dim w-40 white" >
                       <span className="bg-gray br-pill notifyBackground hover-bg-blue pa2">Followers,{followers}</span>
                   </Col>
                   <Col span={4} onClick={showModal} className="pointer dim w-40 white">
                       <span className="bg-gray br-pill notifyBackground hover-bg-blue pa2">Following,{following}</span>
                   </Col>
               </Row>
              </div>
            </div>

            <Modal
                visible={visible}
                title={`${fullname} followers`}
                onCancel={handleCancel}
                footer={[

                ]}
            >
                <Followers userid={id} loggedInUser={isLoggedIn} />
            </Modal>
        </article>
    )
}
export default ProfileCard
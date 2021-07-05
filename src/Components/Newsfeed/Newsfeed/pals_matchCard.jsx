import React from 'react'
import {Avatar,Menu, Dropdown} from 'antd';
import '../newsfeed.css'
import {LoadingOutlined,EllipsisOutlined,CheckCircleFilled} from '@ant-design/icons';
import Followbtn from '../../Follow/feedFollowbtn'
import DeleteFeed from '../deleteFeed'
import ReadMoreReact from 'read-more-react';
import DefaultImage from '../../Dashboard/Defaults/defaultImage'
import RandomString from 'randomstring'
import EditFeed from '../editFeed'
import ReportContent from '../reportFeed'
import Match from './Match/pals_match'

const feedMedia = [{url:"https://assets.vg247.com/current//2014/05/watchdogs_video.jpg",type:"img"},{url:"https://images.indianexpress.com/2016/12/watchdogs-2-main-image-759.jpg",type:"img"},]

const Randstring  = RandomString.generate({
  length:50
})
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const style = { background: '', padding: '8px 0' };
const NewsFeedView = ({feedby,address,loggedIn,id,feedFor,feedType,UserDetails,verified,contentStyle,feedTxt,date}) =>{
    
    const menu = (
        <Menu>
          <Menu.Item key="0">
            {
              loggedIn !== feedby ?
                <Followbtn userid={feedby} followtype={'people'} name={UserDetails.fullname}/>
                : null
            }
            
          </Menu.Item>
          <Menu.Item key="1">
            
            {
              loggedIn === feedby ?
              <EditFeed 
              feedTxt={feedTxt}
              feedMedia={feedMedia}
              UserDetails={UserDetails}
              address={address}
              
              />
                : null
            }
          </Menu.Item>
          
          <Menu.Item key="2">
          {
              loggedIn === feedby ?
              <DeleteFeed address={id} posteby={feedby}/>
                : null
            }
            
          </Menu.Item>
          <Menu.Item key="3">
            <ReportContent/>
          </Menu.Item>
        </Menu>
      );
      const readMore = (
        <span class="f-name underline-hover pointer f6">
        see more...
      </span>
      )
    return(
        <div className="feed-content mt4">
        {/* profile image */}
        
        {
          UserDetails.profileimg ?
            <Avatar src={UserDetails.profileimg} style={{ float: 'left', marginRight: '15px' }} size={40} />
          :<DefaultImage name={UserDetails.fullname} size={40}/>
        }
           
         
          <div className="right-side pa2"> 
          {/* profile name */}
          <div className="tl">
            <a style={{color:'inherit'}} href={`${UserDetails.username}.pal`}><span className="ttc f-name2 feedname ">{UserDetails.fullname}</span></a>
            {
              UserDetails.verified === 1?
              <span className="blue ml2"><CheckCircleFilled /></span>
              :null
            }
            
              <span className="f-name2 ml1 f6">@{UserDetails.username}</span>
              {/* time */}
              <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()} className="feedmenu b f3 ml3 ant-dropdown-link"><EllipsisOutlined /></a>
              </Dropdown>
              
              <span className="feedtime f-name2">{date}</span>
              
          </div>
             {/* content text */}
             
             <div className="tl mt3">
              {
                feedTxt ? <p className="feedtxt fw6 pa2"><ReadMoreReact text={feedTxt}
                min={90}
                ideal={100}
                max={1000}
                  readMoreText={readMore} /></p> : null
              }


              {/* content image */}
              <div className="feed-images pointer w-100"  style={{overflow:"hidden"}}>
                  <Match images={feedMedia} />    
              </div>
             </div>
      </div>
      </div>
    )
}
export default NewsFeedView
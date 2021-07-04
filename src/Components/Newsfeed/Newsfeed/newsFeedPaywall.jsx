import React from 'react'
import { Carousel, Avatar, Spin ,Menu, Dropdown,Image} from 'antd';
import '../newsfeed.css'
import { Row, Col } from 'antd';
import {LoadingOutlined,EllipsisOutlined,CheckCircleFilled} from '@ant-design/icons';
import Followbtn from '../../Follow/followbtn'
import DeleteFeed from '../deleteFeed'
import DefaultImage from '../../Dashboard/Defaults/defaultImage'
import RandomString from 'randomstring'

const imageLock = "https://www.clipartkey.com/mpngs/m/60-600083_padlock-clipart-steel-blue-lock-clipart.png"
const Randstring  = RandomString.generate({
  length:50
})
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const style = { background: '', padding: '8px 0' };
const NewsFeedView = ({feedby,loggedIn,id,feedFor,feedType,UserDetails,verified,feedMedia,contentStyle,feedTxt,date}) =>{
    
    const menu = (
        <Menu>
          <Menu.Item key="0">
            {
              loggedIn !== feedby ?
                <Followbtn userid={feedby} followtype={'people'}/>
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
          {/* <Menu.Item key="3">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              Report content
            </a>
          </Menu.Item> */}
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
            <a style={{color:'inherit'}} href={`${UserDetails.username}.pal`}><span className="ttc fw6 feedname ">{UserDetails.fullname}</span></a>
            {
              UserDetails.verified === 1?
              <span className="blue ml2"><CheckCircleFilled /></span>
              :null
            }
            
              <span className="gray ml1 f6">@{UserDetails.username}</span>
              {/* time */}
              <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()} className="feedmenu b f3 ml3 ant-dropdown-link"><EllipsisOutlined /></a>
              </Dropdown>
              
              <span className="feedtime f-name2">{date}</span>
              
          </div>
             {/* content text */}
             <div className="f6 gray sm dim tc">subscribe to {`${UserDetails.fullname}`} to see their paywall content</div>
             <a className="">
             <div className="tl mt3">
              {/* content image */}
              <div className="feed-images pointer w-100"  style={{overflow:"hidden"}}> 
                     <Carousel autoplay>
                           <Image
                            style={contentStyle}
                            src={imageLock}
                        />
                        
              </Carousel>
              </div>
              <div className="commetLike mt4">
              <Row gutter={16}>
                  <Col className="gutter-row f4 pointer" span={24}>
                  <a href={`/${UserDetails.username}.pal`} class="f5 grow no-underline br3 ba ph4 pv1 mb2 dib white bg-light-blue w-100 tc" >subscribe to see this post</a>
                  </Col>
              </Row>
              </div>
             </div>
             </a>
      </div>
      </div>
    )
}
export default NewsFeedView
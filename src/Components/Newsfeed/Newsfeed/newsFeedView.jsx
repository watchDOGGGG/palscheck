import React from 'react'
import {Avatar,Menu, Dropdown} from 'antd';
import '../newsfeed.css'
import { Row, Col } from 'antd';
import {LoadingOutlined,EllipsisOutlined,CheckCircleFilled} from '@ant-design/icons';
import Comments from '../Comment/Comments.jsx'
import Reaction from '../Reaction/reaction.jsx'
import BookMarkbtn from '../Bookmark/bookmarkbtn.jsx'
import Talkbtn from '../../Talks/TalkStack/joinTalk.jsx'
import Followbtn from '../../Follow/feedFollowbtn'
import DeleteFeed from '../deleteFeed'
import ReadMoreReact from 'read-more-react';
import DefaultImage from '../../Dashboard/Defaults/defaultImage'
import RandomString from 'randomstring'
import EditFeed from '../editFeed'
import ReportContent from '../reportFeed'
import Slider from './imageView'

const Randstring  = RandomString.generate({
  length:50
})

const NewsFeedView = ({feedby,loggedIn,id,UserDetails,feedMedia,contentStyle,feedTxt,date,route}) =>{
    
  function myFunction(id) {
    var x = document.getElementById(`myDIV${id}`);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
 } 
    const menu = (
        <Menu>
          <Menu.Item key="0">
            {
              loggedIn !== feedby ?
                <Followbtn userid={feedby} followtype={'people'} name={UserDetails.fullname}/>
                : null
            }
            
          </Menu.Item>
          {/* <Menu.Item key="1">
            
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
          </Menu.Item> */}
          
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
                    <Slider contentStyle={contentStyle} images={feedMedia}/>
                  </div>
            
             </div>
              {/* comment like icon */} 
              <div className="commetLike mt4">
              <Row gutter={16}>
                  <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                      <Reaction
                      feed_id={id}
                      feed_by={feedby}
                      
                      />
                  </Col>
                  {
                feedTxt.length > 0 ?
                  <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                    <Talkbtn
                      feed_id={id}
                      feed_by={feedby}
                      title={feedTxt.length > 0 ? feedTxt : Randstring}

                    />
                  </Col>
                    :null
                  }
                  
                  <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                    <BookMarkbtn
                    feed_id={id}
                    feed_by={feedby}
                    />
                  </Col>
              </Row>
              </div>
              {/* comments */}
              <div className="ba b--black-10 mt2 pa2">
              <button className="newfeed--3-art" onClick={e=>myFunction(id)}>view all comment</button>
           <div id={`myDIV${id}`} style={{display:'none'}}>
                <Comments 
                feed_id={id}
                feed_by={feedby}
                />
              </div>
              </div>
      </div>
      </div>
    )
}
export default NewsFeedView
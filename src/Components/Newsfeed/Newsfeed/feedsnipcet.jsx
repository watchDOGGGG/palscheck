import React from 'react'
import { Carousel, Avatar, Spin , Dropdown,Image} from 'antd';
import '../newsfeed.css'
import { Row, Col } from 'antd';
import {LoadingOutlined,EllipsisOutlined,CheckCircleFilled} from '@ant-design/icons';
import Comments from '../Comment/Comments.jsx'
import Reaction from '../Reaction/reaction.jsx'
import BookMarkbtn from '../Bookmark/bookmarkbtn.jsx'
import Talkbtn from '../../Talks/TalkStack/joinTalk.jsx'
import ReadMoreReact from 'read-more-react';
import RandomString from 'randomstring'
import Slider from './imageView'

const Randstring  = RandomString.generate({
  length:50
})
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const style = { background: '', padding: '8px 0' };
const NewsFeedView = ({feedby,id,feedMedia,contentStyle,feedTxt}) =>{

      const readMore = (
        <span class=" black-60 underline-hover pointer f6">
        see more...
      </span>
      )
    return(
        <div className="feed-content mt4">
        {/* profile image */}
        
          <div className="right-side pa2"> 
          {/* profile name */}
          
             {/* content text */}
             <a className="">
             <div className="tl mt3">
              {
                feedTxt ? <p className="feedtxt br3 ba b--black-10 pa2 "><ReadMoreReact text={feedTxt}
                min={80}
                ideal={90}
                max={1000}
                  readMoreText={readMore} /></p> : null
              }


              {/* content image */}
              <div className="feed-images pointer w-100"  style={{overflow:"hidden"}}>
                <Slider contentStyle={contentStyle} images={feedMedia}/>
              </div>
             </div>
             </a>
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
                 title= {feedTxt?feedTxt: Randstring}                
                  />
                </Col>
                    :null
                  }
                  
                  <Col className="gutter-row f4 feed-c-i pointer" span={6}>
                    <BookMarkbtn
                    />
                  </Col>
              </Row>
              </div>

      </div>
      </div>
    )
}
export default NewsFeedView
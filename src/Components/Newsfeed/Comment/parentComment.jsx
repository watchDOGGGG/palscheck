import React, {useState,useEffect} from 'react';
import { Comment,Avatar } from 'antd';
import ChildComment from './childComment/comment'
import Reaction from './Reaction/reaction.jsx'

const ParentComment = ({comment_txt, comment_id,feed_id,comment_by,comment_to,comment_date}) => {
 
  const [userDetails, setUserDet] = useState([]);
  const [view_replies,setviewrepl] = useState(false)
  const [hide,sethiderepl] = useState(false)

  useEffect(()=>{
    getUserDetails()
  },[])

   // convey Time Frame
  const time_ago = (time) =>{

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }

      const getUserDetails = async()=>{
        const userDt = await fetch(`http://localhost:4000/Authentication/by_id/${comment_by}`)
        const response = await userDt.json()
        if(response.profiler){
          setUserDet(response.profiler)
        }
      }

      const hidereplies = ()=>{
        sethiderepl(true)
        setviewrepl(false)
      }
      const viewreplies = ()=>{
        sethiderepl(false)
        setviewrepl(true)
      }
  return (
  
    <Comment
      author={<a href={`${userDetails.username}.pal`}><span>{userDetails.fullname}</span></a>}
      avatar={
        userDetails.profileimg?
        <Avatar
          src={userDetails.profileimg}
          alt={userDetails.fullname}
        />:
        null
      }
      content={
        <p className="tl br3 commentBody pa2" style={{width:'fit-content'}}>
          
          {comment_txt}
        </p>
      }
      datetime={
      <span>{time_ago(new Date(comment_date))}</span>
      }
      
    >
    <div className="tr"><Reaction
      feed_id={feed_id}
      react_to={comment_by}      
      comment_id={comment_id}
    /></div>
      {
        view_replies === true?
        <>
        <span onClick={hidereplies} className="pointer ttc">replies...</span>
          <ChildComment
            feed_id={feed_id}
            comment_by={comment_by}
            comment_id={comment_id}
          />
        </>
        :<span onClick={viewreplies} className="pointer ttc">replies...</span>
      }
    </Comment>
  );
};

export default ParentComment
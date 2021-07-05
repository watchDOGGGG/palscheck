import React, { useState,useEffect } from 'react' 
import { UserOutlined,ShopOutlined,HeartFilled,FundFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RandomString from 'randomstring'
import Avatar from '../Dashboard/Defaults/defaultImage'
import CommentIcon from '@material-ui/icons/Comment';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import PalcheckLogo from '../Logo/palscheck-logo/pals-check-blue-favicon.png'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import { FormatListNumberedRtlOutlined, SignalCellularNullSharp } from '@material-ui/icons';
const Randstring  = RandomString.generate({
  length:50
})


const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'

const NotificationTemp = ({addressFrom,notify_action,notify_content,date,id,notify_from,notify_for,viewed})=>{
  const [userInfo,setUserInfo] = useState([])
  const [userInfoFor,setUserInfoFor] = useState([])
  const [FeedInfo,setFeedInfo]= useState([])
  const [view,setView]= useState(0)

  useEffect(()=>{
    UserDetails()
    UserDetailsFor()
  })

  //GEt all user additional info
  const UserDetails = async () => {
    if (notify_from === 'palscheck') {
      return (null)
    } else {
      const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${notify_from}`)
      const response = await FetchAllDetails.json()
      
      if (response.profiler) {
        setUserInfo(response.profiler)
      }
    }

  }
  const UserDetailsFor = async () => {
    if (notify_from === 'palscheck') {
      return (null)
    } else {
      const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${notify_for}`)
      const response = await FetchAllDetails.json()
      
      if (response.profiler) {
        setUserInfoFor(response.profiler)
      }
    }

  }
  const UpdateNotify = async(address)=>{
    alert(address)
    const UpdateN = await fetch(`${SeverLink}/Authentication/update/Notify/${address}`,{
      method:"PATCH"
    })
    const response = await UpdateN.json()
    if(response.result){
      setView(1)
    }
  }

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
  
    if (seconds === 0) {
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
  
  const DisplayIcon = (event)=>{
    if(event === 'following'){
      return(<SupervisorAccountIcon/>)
    }else if(event === 'reaction'){
      return(<FavoriteIcon/>)
    }else if(event === 'comment'){
      return(<CommentIcon/>)
    }else if(event === 'subme'){
      return(<SubscriptionsIcon/>)
    }else if(event === 'submeNotice'){
      return(<SubscriptionsIcon/>)
    }else if(event === 'acctbalance'){
      return(<MoneyOffIcon/>)
    }else if(event === 'memo'){
      return(<ViewCarouselIcon/>)
    }
    
  }

  
  return (
    
    <div>
        {
        notify_action === 'following' ?
          viewed === 0 ?
          // {/* notification from users action following*/}
          <article class="center br3 hidden ba b--black-10  notifyBackground" onClick={e => UpdateNotify(id)}>
            <div class="mt0 bt b--black-10">
              <Link to={`/${userInfo.username}.pal`}>
                <div className="mr2">
                  <Avatar name={userInfo.fullname} size={40} src={userInfo.profileimg} />
                  <div className="dib ml2 fw6">{userInfo.fullname} &nbsp;.&nbsp;<div className="fw1 gray sm dim f6 dib">{notify_action}</div></div>
                </div>
                <p class="f6 lh-copy fname db ml4">
                  {notify_content}
                </p>
                <div className="ml4 blue tr flex">
                  {DisplayIcon(notify_action)}<span className="f-name2">{time_ago(new Date(date))}</span>
                </div>
              </Link>
            </div>
          </article>
          :null
          : notify_action === 'comment' ?
          viewed === 0 || view === 0 ?
            <article class="center br3 hidden ba b--black-10 mv4 notifyBackground" onClick={e => UpdateNotify(id)} >
              <div class="mt0 bt b--black-10">
                <div className="mr2">
                  <Link to={`/${userInfo.username}.pal`}>
                    <Avatar name={userInfo.fullname} size={40} src={userInfo.profileimg} />
                    <div className="dib ml2 fw6">{userInfo.fullname} &nbsp;.&nbsp;<div className="fw1 gray sm dim f6 dib">{notify_action}</div></div>
                  </Link>
                </div>
                <p class="f6 lh-copy fname db ml4">
                  {notify_content}
                </p>
                <div className="ml4 blue tr flex">
                  {DisplayIcon(notify_action)}<span className="f-name2">{time_ago(new Date(date))}</span>
                </div>
                {/* //Display Feed Content */}
               
              </div>
            </article>
            :null


              // {/* notification from users action react*/}
            : notify_action === 'reaction' ?
            viewed === 0 || view === 0 ?
              <article class="center br3 hidden ba b--black-10 mv4 notifyBackground" onClick={e => UpdateNotify(id)} >
                <div class="pa1 bt b--black-10">
                  <div className="mr2">
                    <Link to={`/${userInfo.username}.pal`}>
                      <Avatar name={userInfo.fullname} size={40} src={userInfo.profileimg} />
                      <div className="dib ml2 fw6">{userInfo.fullname} &nbsp;.&nbsp;<div className="fw1 gray sm dim f6 dib">{notify_action}</div></div>
                    </Link>
                  </div>
                  <p class="f6 lh-copy fname db ml4">
                    {notify_content}
                  </p>
                  <div className="ml4 dark-red tr flex">
                    {DisplayIcon(notify_action)}<span className="f-name2">{time_ago(new Date(date))}</span>
                  </div>
                  {/* //Display Feed Content */}
                 
                </div>
              </article>
              :null

              // {/* notification to user when someone subscribe to them*/}
              : notify_action === 'subme' ?
              viewed === 0 || view === 0 ?
                <article class="center br3 hidden ba b--black-10 mv4 notifyBackground" onClick={e => UpdateNotify(id)}>
                  <div class="pa1 bt b--black-10">
                    <div className="mr2">
                      <Link to={`/${userInfo.username}.pal`}>
                        <Avatar name={userInfo.fullname} size={40} src={userInfo.profileimg} />
                        <div className="dib ml2 fw6">{userInfo.fullname} &nbsp;.&nbsp;<div className="fw1 gray sm dim f6 dib">{notify_action}</div></div>
                      </Link>
                    </div>
                    <p class="f6 lh-copy fname db ml4">
                      {notify_content}
                    </p>
                    <div className="ml4 mid-gray tr flex">
                      {DisplayIcon(notify_action)}<span className="f-name2">{time_ago(new Date(date))}</span>
                    </div>
                    </div>
                  </article>
                  : null
                // {/* notification for subscription Notice*/}
                : notify_action === 'submeNotice' ?
                viewed === 0 || view === 0 ?
                  <article class="center br3 hidden ba b--black-10 mv4 notifyBackground" onClick={e => UpdateNotify(id)}>
                    <div class="pa1 bt b--black-10">
                      <div className="mr2">
                        {
                          notify_from === "palscheck" ?
                            <>
                              <Avatar name={'palscheck'} size={40} src={PalcheckLogo} />
                              <div className="dib ml2 fw6">{'palscheck'} &nbsp;.&nbsp;<div className="fw1 gray sm dim f6 dib">{notify_action}</div></div>

                            </>
                            : null
                        }
                      </div>
                      <p class="f6 lh-copy fname db ml4">
                        {notify_content}
                      </p>
                      <div className="ml4 mid-gray tr flex">
                        {DisplayIcon(notify_action)}<span className="f-name2">{time_ago(new Date(date))}</span>
                      </div>
                      
                    </div>
                  </article>
                  :null

                  // {/* notification from users acct balance*/}
                  : notify_action === 'acctbalance' ?
                  viewed === 0 || view === 0 ?
                    <article class="center br3 hidden ba b--black-10 notifyBackground" onClick={e => UpdateNotify(id)}>
                      <div class="pa1 bt b--black-10">
                        <div className="mr2">
                          {
                            notify_from === "palscheck" ?
                              <>
                                <Avatar name={'palscheck'} size={40} src={PalcheckLogo} />
                                <div className="dib ml2 fw6">{'palscheck'} &nbsp;.&nbsp;<div className="fw1 gray sm dim f6 dib">{notify_action}</div></div>

                              </>
                              : null
                          }
                        </div>
                        <p class="f6 lh-copy fname db ml4">
                          {notify_content}
                        </p>
                        <div className="ml4 mid-gray tr flex">
                          {DisplayIcon(notify_action)}<span className="f-name2">{time_ago(new Date(date))}</span>
                        </div>
                      </div>
                    </article>
                      :null

                    // {/* notification for memo receive*/}
                    :notify_action === 'memo' || notify_action === 'feedback'?
                    viewed === 0 || view === 0 ?
                      <article class="center br3 hidden ba b--black-10 mv4 notifyBackground" onClick={e => UpdateNotify(id)}>
                          <div class="pa1 bt b--black-10">
                           <a href="/memos"> 
                            <div className="mr2">
                              <Link to={`/${userInfo.username}.pal`}>
                                <Avatar name={userInfo.fullname} size={40} src={userInfo.profileimg} />
                                <div className="dib ml2 fw6">{userInfo.fullname} &nbsp;.&nbsp;<div className="fw1 gray sm dim f6 dib">{notify_action}</div></div>
                              </Link>
                            </div>
                            <p class="f6 lh-copy fname db ml4">
                              {notify_content}
                            </p>
                            <div className="ml4 mid-gray tr flex">
                              {DisplayIcon(notify_action)}<span className="f-name2">{time_ago(new Date(date))}</span>
                            </div>
                          </a>
                        </div>
                      </article>
                      :null
                        : null
      }

    </div>

  )
}
export default NotificationTemp
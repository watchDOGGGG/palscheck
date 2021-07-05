import React from 'react'
import '../newsfeed.css'
import View from './newsFeedView'
import PayWallView from './newsFeedPaywall'
import NotificationView from './feedsnipcet'
import Match from './pals_matchCard'
const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'

const contentStyle = {
  width:'473px'
}

class NewsFeedTemp extends React.Component{
  
  constructor(){
    super()
    this.state = {
      Paywallauthorize:0,
      feedMedia:[],
      UserDetails:[]
    }
  }
  

  componentDidMount(){
    this.UserDetail()
    this.checkIFsub()
    this.Feedmedia()
  }
  //GEt all user additional info
   UserDetail = async()=>{
    const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${this.props.feedby}`)
    const response = await FetchAllDetails.json()
    if(response.profiler){
      this.setState({UserDetails:response.profiler})
    }
  }
 
   //GEt feedMedia
    Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`${SeverLink}/Feed/${this.props.id}`)
    const response = await FetchAllMedia.json()
    if(response.results){
      this.setState({feedMedia:response.results})
    }
  }
 
  // if feed_for is set to paywall check if the logged in user has subscribe to the owner of that feed if yes display the full content of that feed else lock feed 
  // for unauthorized users 
   checkIFsub = async()=>{
    const Check = await fetch(`${SeverLink}/PayWall/checkIFsub/subme/${this.props.feedby}`,{
        headers:{token:localStorage.token}
    })
    const res = await Check.json()
    if(res.data){
        this.setState({Paywallauthorize:1})
    }else{
      if(this.props.feedby === this.props.loggedIn){
        this.setState({Paywallauthorize:1})
      }else{
        this.setState({Paywallauthorize:0})
      }
      
    }
}

   // convey Time Frame
     time_ago = (time) =>{

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

  render(){
 const {feedby,loggedIn,id,feedFor,feedType,feedTxt,address,date,route} = this.props
 const {feedMedia,UserDetails,Paywallauthorize} = this.state
    return (
      <div className="demo-infinite-container">
        
          <>
          {
            route === 'notification'?
            <NotificationView
            feedby={feedby}
             loggedIn={loggedIn}
             id={id}
             feedFor={feedFor}
             feedType={feedType}
             contentStyle={contentStyle}
             UserDetails={UserDetails}
             feedMedia={feedMedia}
             feedTxt={feedTxt}
             date={this.time_ago(new Date(date))}
             route={route}
             />
            :
            feedType === 'feed' ?
              feedFor === 'paywall'?
              Paywallauthorize === 0?
              <PayWallView
              feedby={feedby}
             loggedIn={loggedIn}
             id={id}
             feedFor={feedFor}
             feedType={feedType}
             contentStyle={contentStyle}
             UserDetails={UserDetails}
             feedMedia={feedMedia}
             feedTxt={feedTxt}
             date={this.time_ago(new Date(date))}
             route={route}
              />
              :
              <View
             feedby={feedby}
             loggedIn={loggedIn}
             id={id}
             feedFor={feedFor}
             feedType={feedType}
             contentStyle={contentStyle}
             UserDetails={UserDetails}
             feedMedia={feedMedia}
             feedTxt={feedTxt}
             address={address}
             date={this.time_ago(new Date(date))}
             route={route}
             />
              :
             <>
             <View
             feedby={feedby}
             loggedIn={loggedIn}
             id={id}
             feedFor={feedFor}
             feedType={feedType}
             contentStyle={contentStyle}
             UserDetails={UserDetails}
             feedMedia={feedMedia}
             feedTxt={feedTxt}
             date={this.time_ago(new Date(date))}
             route={route}
             />
             </>
            :
            feedType === 'match'?
            <Match
            feedby={feedby}
             loggedIn={loggedIn}
             id={id}
             feedFor={feedFor}
             feedType={feedType}
             contentStyle={contentStyle}
             UserDetails={UserDetails}
             feedMedia={feedMedia}
             feedTxt={feedTxt}
             date={this.time_ago(new Date(date))}
             route={route}
            />
           
            :null
          }
          </>
      </div>
    );
        }
}

export default NewsFeedTemp
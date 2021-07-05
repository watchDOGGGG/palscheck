
import React from 'react'
import TalkBox from './talkbox.jsx'
import TalkCard from './talkCrd.jsx'
import Helmet from '../Helmet/helment'
import FeedSnipset from '../Newsfeed/Newsfeed/feedsnipcet'

const messagesEndRef = React.createRef()

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
class Talks extends React.Component{
    constructor(){
        super()
        this.state = {
            userID:[],
            talks:[],
            feedMedia:[],
            feed: [],
            isLoggedIn:[]

        }
    }
    
    componentDidMount(){
      try {
        
        this.getLoggedInUser()
        this.setUserDT()
        this.getPostDT()
        // this.scrollToBottom()
          
          this.Feedmedia()
        } catch (error) {
          
        }

    }
    componentDidUpdate(){
      this.fetchChats()
    }
    scrollToBottom = () => {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

       //getLoggedInuser
       getLoggedInUser = async()=>{
        const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
    }

 
    fetchChats = async()=>{
      const fetchtalks = await fetch(`${SeverLink}/Talk/${this.props.match.params.id}`)
      const response = await fetchtalks.json()
      if(response.result){
          this.setState({talks:response.result})
      }
    }
    setUserDT = async()=>{
        const setid = await fetch(`${SeverLink}/Authentication/`,{
            headers:{token:localStorage.token},
        })
        const response = await setid.json()
        if(response){
            this.setState({userID:response})
        }
    }
      //GEt feedMedia
   Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`${SeverLink}/Feed/${this.props.match.params.id}`)
    const response = await FetchAllMedia.json()
    if(response.results){
      this.setState({feedMedia:response.results})
    }
  }
  getPostDT = async()=>{
    const FetchData = await fetch(`${SeverLink}/Feed/single/${this.props.match.params.id}`)
    const response = await FetchData.json()
    if(response.result){
      this.setState({feed:response.result})
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
    render(){
        const {isLoggedIn,feed,feedMedia,userID,talks} = this.state
        return(
            
            <div className="center talkq3e w-80">
              <Helmet title={'Talks'} description={'Talks'}/>
                <div className="flex center">
                  <div className="br w-80 db">
                      {/* chat area */}
                <div style={{height: "81vh",overflowY: 'auto'}} className="w-100 b--black-10 db">
                    {
                        talks.length > 0?
                         <TalkCard talks = {talks} isLoggedIn={isLoggedIn}/>
                        :
                        <p>No talks on this</p>
                  }
                  <div ref={messagesEndRef} />
              </div>
              {/* chatbox */}
              <TalkBox
                  userIDT={userID.id}
                  address={this.props.match.params.id}
                  fullname={userID.fullname}
                  profileIMG={userID.profileimg}
                />
              </div>
              
                {/* info detail */}
                <div className="bl w-60 b--black-10">
                  {
                  feed._id ?
                    <FeedSnipset feedby={feed.feedby} id={feed._id} feedFor={feed.feedFor} feedType={feed.feedType} feedTxt={feed.feedTxt} address={feed.address} date={feed.date} feedMedia={feedMedia}/>
                    :null
                  }
                        
                </div>
                </div>
            </div>
        )
    }
}
export default Talks
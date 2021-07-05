import React from 'react'
import {Avatar,} from 'antd';
import {Link} from 'react-router-dom'
import { UserOutlined,BookOutlined } from '@ant-design/icons';
import BookmarkIcon from '@material-ui/icons/Bookmark';
const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
class BookMarkTemp extends React.Component {
  state = {
    data: [],
    feedMedia:[],

  };

  componentDidMount() {
    this.postDetails()
    this.Feedmedia()
  }
 
  postDetails = async()=>{
    const fetchfeedDt = await fetch(`${SeverLink}/Feed/getfeedbyid/${this.props.feedid}`)
    const response = await fetchfeedDt.json()
    if(response.result){
      this.setState({data:response.result})
    }
  } 

   //GEt feedMedia
   Feedmedia = async()=>{
    const FetchAllMedia = await fetch(`${SeverLink}/Feed/${this.props.feedid}`)
    const response = await FetchAllMedia.json()
    if(response !== 'no post'){
      this.setState({feedMedia:response})
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

  render() {
    
    return (
      <div className="demo-infinite-container">
          <ul class="list f6 tl pa2">
            {/* notification from users action when order is made*/}
            <li className="ba b--black-10 pointer grow db">
              <Link to={`${this.props.feedid}.feed`}>
                <div class="dt flex pa1">
                  <div class="dib">
                  {
                  this.state.feedMedia.length > 0?
                      <Avatar src={this.state.feedMedia[0].url} size={64} shape="square" icon={<UserOutlined />} />
                      :null
                    }                 
                     </div>
                  <div class="dib ml2 tl w-80">
                    <p class="lh-copy flex">
                    <span className="blue"><BookmarkIcon /></span>
                     {this.state.data.feedTxt}
                     </p>
                  <span className="tl gray mr1">{this.time_ago(new Date(this.state.data.date))}</span>
                  </div>
                  <div class="dib">
                    {
                      this.state.feedMedia.length > 0?
                      <Avatar src={this.state.feedMedia[0].url} size={64} shape="square" icon={<UserOutlined />} />
                      :null
                    }
                  </div>
                </div>
              </Link>
            </li>
          </ul>
      </div>
    );
  }
}

export default BookMarkTemp
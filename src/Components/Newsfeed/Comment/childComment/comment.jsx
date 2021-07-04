import React from 'react';
import {Tooltip} from 'antd';
import {SmileFilled} from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ContentEditable from 'react-contenteditable'
import CommentCrd from './childcommentcrd'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SeverLink = 'http://localhost:4000'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class ChildComment extends React.Component{
    constructor(){
        super()
        this.state = {
            html:'',
            emojiVisbility:false,
            commentTxt:[],
            Allrplys:[],
            loading: false
        }
    }

    
    componentDidMount(){
      this.getAllrply()  
    }
  
     //setting Emoji
       handleTxtChange = evt => {
        this.setState({html:evt.target.value});
      };
    
       setEmojiVisible = () => {
        this.setState({emojiVisbility:true})
      } 
     
      seTemoji = (evt) => {
        this.setState({html:this.state.html + evt.native} );
      }
      seTemojiOut = ()=>{
        this.setState({emojiVisbility:false})
      }
      //post comments
       Postrpl= async()=>{
       if(this.state.html !==''){
        this.setState({loading:true})
        const post_C = await fetch(`${SeverLink}/Feed/replyFeed`,{
          method:'POST',
          headers:{"Content-Type":"application/json",token:localStorage.token},
          body:JSON.stringify({
            to:this.props.comment_by,
            txt:this.state.html,
            comment_id:this.props.comment_id,
            feed_id:this.props.feed_id
          })
        })
        const response = await post_C.json()
        if(response.rpl){
          this.setState({html:'',loading:false})
          this.setState({commentTxt:'posted....'})
        }
       }
      }

      getAllrply = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Feed/getAllcommentsrply/${this.props.feed_id}/${this.props.comment_id}`)
        const response = await fetchAll.json()
        if(response.rplys){
          this.setState({Allrplys:response.rplys})
        }
      }

    render(){
       const {loading} = this.state
        return (
            <div className="bl pa1">
              {this.state.commentTxt}
                <CommentCrd All_rply={this.state.Allrplys}/>
              <div className="flex bb b--black-10 mt0 pa1">
              <ContentEditable
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleTxtChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    data-placeholder="write comment here..."
                    id="l557r_Commentbox"
                    spellcheck="true"
                    className="w-60 tl ml2 mt1 f5 textarea_13l"
                    />
                    <Tooltip title="Emojis">
                  <span className="dib ml3 f4 blue"><SmileFilled onClick={this.setEmojiVisible}/></span>
                  </Tooltip>
                    {
                    this.state.emojiVisbility === false?
                            null :
                            <div onMouseLeave={this.seTemojiOut}>
                   <Picker 
                    onSelect={this.seTemoji} 
                    theme="dark" 
                    set='google'
                      style={{ position: 'absolute', left: '20px',zIndex:99 }} 
                      title='Pick your emoji…' 
                      emoji='point_up' i18n={{ search: 'search...', categories: { search: 'search emojis', recent: 'Recent' } }} 
                      size={34}
                      />
                   </div>
               }
              <Tooltip title="send">
                {
                  this.state.html.length > 0?
                  <span className="dib ml3 f6 pointer blue lh-copy mt1 b" onClick={this.Postrpl}>post
                  {
                    loading === true?
                    <Spin indicator={antIcon} />
                    :null
                  }
                  </span>
                  :
                  <span className="dib ml3 f6 pointer blue lh-copy mt1 b" disabled>post</span>
                }
                  </Tooltip>
                </div>
              </div>
            
          );
    }
}
export default ChildComment
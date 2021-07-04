import React from 'react';
import {Tooltip} from 'antd';
import {SmileFilled,} from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ContentEditable from 'react-contenteditable'
import CommentCrd from './commentCrd'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SeverLink = 'http://localhost:4000'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class Comments extends React.Component{
    constructor(){
        super()
        this.state = {
            html:'',
            emojiVisbility:false,
            commentTxt:[],
            Allcomments:[],
            loading: false
        }
    }

    
    componentDidMount(){
        this.getAllcomment()        
    }

  
     //setting Emoji
       handleTxtChange = evt => {
        this.setState({html:evt.target.value});
      };
    
       setEmojiVisible = () => {
        this.state.emojiVisbility === false?
        this.setState({emojiVisbility:true}):
        this.setState({emojiVisbility:false})
      } 
     
      seTemoji = (evt) => {
        this.setState({html:this.state.html + evt.native} );
      }
      seTemojiOut = ()=>{
        this.setState({emojiVisbility:false})
      }
      //post comments
      PostComment = async()=>{
        this.setState({loading:true})
        const post_C = await fetch(`${SeverLink}/Feed/commentFeed`,{
          method:'POST',
          headers:{"Content-Type":"application/json",token:localStorage.token},
          body:JSON.stringify({
            to:this.props.feed_by,
            txt:this.state.html,
            feed_id:this.props.feed_id
          })
        })
        const response = await post_C.json()
        if(response.comments){
          this.setState({html:''})
          this.setState({commentTxt:'posted....'})
        }
      }
       getAllcomment = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Feed/getAllcomments/${this.props.feed_id}`)
        const response = await fetchAll.json()
        if(response.comments){
          this.setState({Allcomments:response.comments})
        }
      }

    render(){
       const {loading,html,emojiVisbility} = this.state
     
        return (
            <div>
              <div className="commentIn flex bb b--black-10 mt2 pa1">
              
              <ContentEditable
                    html={html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleTxtChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    data-placeholder="write comment here..."
                    id="l557r_Commentbox"
                    spellcheck="true"
                    className="w-80 tl ml2 mt1 f5 textarea_13l"
                    />
                    <Tooltip title="Emojis">
                  <span className="dib ml3 f4 blue"><SmileFilled onClick={()=>this.setEmojiVisible()}/></span>
                  </Tooltip>
                    {
                    emojiVisbility === false?
                            null :
                   <Picker 
                    onSelect={this.seTemoji} 
                    theme="dark" 
                    set='google'
                      style={{ position: 'absolute', left: '20px',zIndex:99 }} 
                      title='Pick your emoji…' 
                      emoji='point_up' i18n={{ search: 'search...', categories: { search: 'search emojis', recent: 'Recent' } }} 
                      size={34}
                      />
               }
              <Tooltip title="send">
                {
                 html.length > 0?
                  <span className="dib ml3 f6 pointer blue lh-copy mt1 b" onClick={this.PostComment}>post
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
                <p>{this.state.commentTxt}</p>
                
              <CommentCrd All_comments={this.state.Allcomments}/>
              
            </div>
            
          );
    }
}
export default Comments
import React from 'react'
import {SmileFilled,SendOutlined} from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'

class TalkBox extends React.Component{

    constructor(){
        super()
        this.state = {
            visible: false,
            html: "",
            error: '',
            isLoggedIn: [],
            load:false,
            emojiVisbility:false
        }
    }
    componentDidMount() {
        try {
            this.getLoggedInUser()
        } catch (error) {
        }
    }
    hide = () => {
        this.setState({
          visible: false,
        });
      };
    
      handleVisibleChange = visible => {
        this.setState({ visible });
      };

     
     //setting Emoji
     handleTxtChange = evt => {
        this.setState({html:evt.target.value});
      };
    
      seTemoji = (evt) => {
        this.setState({html:this.state.html + evt.native} );
      }
      seTemojiOut = ()=>{
        if(this.state.emojiVisbility === false){
            this.setState({emojiVisbility:true})
        }else{
            this.setState({emojiVisbility:false})
        }
        
      }
     
    getLoggedInUser = async () => {
        const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`, {
            headers: { token: localStorage.token }
        })
        const response = await getLogginUser.json()
        this.setState({ isLoggedIn: response.loggedIn })
    }
    handleTxtChange = evt => {
        this.setState({ html: evt.target.value });
    };

    sendMsg = async()=>{
        this.setState({load:true})
        let txttone = new Audio(`https://storage.googleapis.com/still-cover/developersFolder/iphone_msg_sent.mp3`)
        this.setState({ html: '',error:''});
        const SendTxt = await fetch(`${SeverLink}/Talk/insertChat`,{
            
            method: 'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                txt:this.state.html,
                address:this.props.address
            })
        })
        const response = await SendTxt.json()
        if(response.msg){
            this.setState({ html: '',error:'',load:false});
            txttone.play()
        }
    }
    
    render() {
        const { error,html,load,emojiVisbility } = this.state
        return (
            <>
            <div className="center w-100 pa2 db menuColor chat-box">
                <div className="dib w-60 chatbotIn">
                    <input onChange={this.handleTxtChange} value={html} type="text" placeholder="let's talk about this..." className="w-100 f-name newfeed--3-art" />
                </div>
                        
                    <a className="dib f3 yellow pointer pa2 relative emoji23if8 w-10" onClick ={this.seTemojiOut}><EmojiEmotionsOutlinedIcon />
                    {
                        emojiVisbility === true?
                        <div className="emojipop">
                        <Picker
                            onSelect={this.seTemoji}
                            theme="dark"
                            set='google'
                            title='Pick your emoji…'
                            emoji='point_up' i18n={{ search: 'search...', categories: { search: 'search emojis', recent: 'Recent' } }}
                            size={34}
                        />
                        </div>:null
                    }
                    </a>
                    <a class=" f4 link w-auto br-pill b fw5 blue dib tc" onClick={this.sendMsg}>{load === true? <Spin indicator={antIcon} />:<SendOutlined /> }</a>
                
            </div>
        </>
        )
    }
}
export default TalkBox
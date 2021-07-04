import React from 'react'
import {HeartOutlined,HeartFilled} from '@ant-design/icons';
import './reaction.css'

const SeverLink = 'http://localhost:4000'
const style = { background: '', padding: '0px 0' };
class Reaction extends React.Component{

    constructor(){
        super()
        this.state = {
            reaction:'',
            count:[],
            countread:''
        }
        
    }
    componentDidMount(){
        this.checkIfLiked()
            this.getReactCount()
    }

    getReactCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Feed/like/count/${this.props.feed_id}`)
        const response = await fetchAll.json()
        if(response.count){
            if(response.count === 0){
                this.setState({count:'',})
            }else{
                if(response.count === 1){
                this.setState({count:response.count,countread:'like'})
            
            }else{
                this.setState({count:response.count,countread:'likes'})
            }
        }
        }
    }
    SendReact = async()=>{
        try {
            
        const send_re3 = await fetch(`${SeverLink}/Feed/reaction`,{
            method:'POST',
            headers:{'Content-Type':'application/json',token:localStorage.token},
            body: JSON.stringify({
                feed_id:this.props.feed_id,
                react_to:this.props.feed_by,
                type:'feed'
            })
        })
        const response = await send_re3.json()
        if(response.liked){
            this.setState({reaction:'liked',})
            this.setState({
                count: this.state.count + 1
              });
        }else if(response.unliked){
            this.setState({reaction:'',})
            this.setState({
                count: this.state.count - 1
              });
        }
        } catch (error) {
            console.log(error.message)
        }
        
    }
   
    checkIfLiked = async()=>{
        
        const checked = await fetch(`${SeverLink}/Feed/hasLiked/${this.props.feed_id}`,{
            headers:{token:localStorage.token},
        })
        const response = await checked.json()
        if(response.liked){
            this.setState({reaction:'liked'})
        }else{
            this.setState({reaction:''})
        }
    }

    render(){
        const {count,countread} = this.state
        return(
            <>
            {/* {
                this.state.reaction === '' ?
                <div style={style} className="hover-dark-red f33lke"><HeartOutlined onClick={this.SendReact} />&nbsp;<span className="f6">{count} {countread}</span></div>
                :
                <div style={style} className="dark-red unf33lke"><HeartFilled onClick={this.SendReact} />&nbsp;<span className="f6">{count} {countread}</span></div>

            } */}
            {
                this.state.reaction === '' ?
                <div>
                    <label class="like" style={style} onClick={this.SendReact}>
                    <input type="checkbox"/>
                    <div class="hearth" />
                </label>
                &nbsp;<span className="f6">{count} {countread}</span>
                </div>
                :
                <label class="like" style={style} onClick={this.SendReact}>
                    <input type="checkbox" checked/>
                    <div class="hearth" />
                </label>
            }
                
            </>
        )
    }
}
export default Reaction
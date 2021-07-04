import React from 'react'
import {Button} from 'antd'

class DeleteAct extends React.Component{

    constructor(){
        super()
        this.state = {
            error:'',
            msg:''
        }
    }
    GetDeleteCode = async()=>{
        const GetCode = await fetch('https://still-cover-backend.uc.r.appspot.com/Authentication/sendDelete/userCode',{
            headers:{token:localStorage.token}
        })
        const response = await GetCode.json()
        if(response.success){
            this.setState({msg:'A 5 digit pin was sent to your mail'})
            setInterval(() => {
                window.location = "delete/Account"
            }, 6000);
            
        }else{
            this.setState({error:response.error})
        }
    }
    render(){
        const {error,msg} = this.state
        return(
            <div>
                <span>
                   check our <a href="palscheckterms.com">policy for more details on deleting accounts</a> . 
                </span>
                <div>
                    <Button
                    onClick={this.GetDeleteCode}
                    >Delete Account</Button>
                    <span className="red db">
                    {error}
                    </span>
                    <span className="green db">
                    {msg}
                    </span>
                </div>
            </div>
        )
    }
}
export default DeleteAct
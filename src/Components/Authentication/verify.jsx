import React from 'react'
import { Alert} from 'antd';
import { Spin, Space } from 'antd';

const SeverLink = 'http://localhost:4000'


class Verification extends React.Component{
    constructor(){
        super()
        this.state = {
            route:0,
            code:'',
            error: '',
            success:'',
            loading:false
        }
    }

    setCode = (event)=>{
        this.setState({code:event.target.value})
    }
    
    submitCode = async(e)=>{
       
        e.preventDefault(e)
        this.setState({loading:true})
        const SendCode = await fetch(`http://localhost:4000/Authentication/verifycode/${this.props.user}`,{
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                verfcode: this.state.code
            })
        })
        const response = await SendCode.json()
        if(response.success){
            this.setState({success:response.success,error:'',loading:false})

        }else if(response.error){
            this.setState({error:response.error,success:'',loading:false})
        }
  
    }
    resendCode = async() =>{
        const resend = await fetch(`http://localhost:4000/Authentication/resend/${this.props.user}`)
        const res = await resend.json()
        if(res.success){
            this.setState({success:res.success,error:'',loading:false})
        }
    }
    render() {
        const { route, error, success, loading,code } = this.state
        return (
            <form style={{heiight:'200px', overflow:'hidden'}}>
                <div class="social-container">
                    Your account has been successfully created please enter the verifcation code sent to your phone in the box.
                </div>
                <div id="wrapper">
                    <div id="dialog">
                        <input class="tc w-100" value={code} type="text" min="0" maxLength="5" placeholder="Pin" onChange={e => this.setCode(e)} required />
                            
                        <button className="db center " onClick={this.submitCode}>Verify </button>
                        <div>
                            Didn't receive the code?<br />
                            <a onClick={this.resendCode}>Send code again</a><br />
                        </div>
                        {
                            loading === true ?
                                <Spin size="large" />
                                : null
                        }

                        <span className="red">{error}</span>
                        <span className="green">{success}</span>
                    </div>
                </div>
            </form>
        )
    }
}
export default Verification
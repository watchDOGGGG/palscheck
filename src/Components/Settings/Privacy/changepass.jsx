import { Input,Button } from 'antd'
import React from 'react'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'
class NewPassword extends React.Component{

    constructor(){
        super()
        this.state={
            np:'',
            cp:'',
            crp:'',
            error:'',
            msg:''
        }
    }
    
    setNp = (event)=>{
        this.setState({np:event.target.value})
    }
    setCrp = (event)=>{
        this.setState({crp:event.target.value})
    }
    setCp = (event)=>{
        this.setState({cp:event.target.value})
    }
    setPassword = async(e)=>{
        e.preventDefault()
        
            this.setState({ error: '' })
            const SubmitRequest = await fetch(`${SeverLink}/Patch/Update/Password/`,{
                method:'PATCH',
                headers:{"Content-Type":"application/json",token:localStorage.token},
                body:JSON.stringify({newpassword:this.state.np,comfirmpassword:this.state.cp,oldpassword:this.state.crp})
            })
            const res = await SubmitRequest.json()
            if(res.error){
                this.setState({error:res.error,msg:''})
            }else{
                this.setState({msg:res.success,error:''})
            }

    }
    render(){
        const {route,msg,error,np,cp} = this.state
        return (
            <div>

                <main class="pa4">
                    <form class="measure center" onSubmit={e=>this.setPassword(e)}>
                        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                            <legend class="f4 fw6 ph0 mh0">Change password</legend>
                            <span>Please enter your new password. Choose a password that is easy to remember but difficult for others to guess</span>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">Current Password</label>
                                <input onChange={e => this.setCrp(e)} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">New Password</label>
                                <input onChange={e => this.setNp(e)} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">Comfirm Password</label>
                                <input onChange={e => this.setCp(e)} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div class="">
                            <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Done"/>
                        </div>
                        <span className="red">
                            {error}
                        </span >
                        <span className="green">
                            {msg}
                        </span>
                    </form>
                </main>

            </div>
        )
    }
}
export default NewPassword
import React from 'react'
import { Radio } from 'antd';
import {Link} from 'react-router-dom'
import { notification } from 'antd';
import LOGO from '../Logo/logofav2.jsx'
import PhoneInput, {isValidPhoneNumber } from 'react-phone-number-input'
import Verify from './verify'
import { Spin, Space } from 'antd';

const localLink = 'http://localhost:4000'

const optionsWithDisabled = [
    { label: 'male', value: 'male' },
    { label: 'female', value: 'female' },
    { label: 'custom', value: 'custom'},
  ];

class Register extends React.Component{

    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            repass: '',
            gender: 'male',
            error:[],
            loading: false,
            msg:'',
            phone:'',
            route:1
        }
    }
    componentDidMount(){
        if(this.state.route === 1){
             this.submitFormToregister()
        }
        this.switchEffect()
    }
    openNotification = (type) => {
        notification[type]({
            message: 'Success',
            description:
            'Check your phone for a 5 digit verification code from palscheck copy and paste in the verification box to verify your account.',
          });
        };
     
    onChange4 = e => {
        this.setState({
          gender: e.target.value,
        });
      };
    
      
    switchEffect(){
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
});
    }

    submitFormToregister = ()=>{
        var form = document.querySelector('form')
        form.addEventListener('submit',(e)=>{
            e.preventDefault(e)
            this.validatepassword()
        })
    }

    validatepassword = async()=>{
        this.setState({loading:true,error:''})
        var pass = document.getElementById('pass')
        var cpass = document.getElementById('cpass')

        if(pass.value.length < 6){
            this.setState({error:'password too short',loading:false})
        }else if(cpass.value !== pass.value){
            this.setState({error:'password not match',loading:false})
        }else{
            const Send = await fetch(`${localLink}/Authentication/`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    firstname:this.state.firstname,
                    lastname:this.state.lastname,
                    email:this.state.email,
                    password:this.state.password,
                    phone:this.state.phone,
                    gender:this.state.gender
                })
            })
            const response = await Send.json()
            if(response.success){
               this.openNotification('success')
               this.setState({loading:'done',error:'',msg:'please check your phone for a 5 digit verification code from palscheck.'})
                this.setState({route:0})
            }else if(response.error){
                this.setState({error:response.error,loading:false})
            }else{
                 this.setState({error:'Error siging in',loading:false})
            }
        }
   }
    setPhone = (e) =>{
        this.setState({phone:e})
    }

    render(){
        
    const {gender,route,error,loading,firstname,lastname,email,password,repass,msg,phone} = this.state;
        return (
            <>
                {
                    route === 1 ?
                        <form action="#">
                            <h1 className="flex" style={{ lineHeight: 3 }}><LOGO />Create Account</h1>
                            <div class="social-container">
                                we just need few info to get started
                            </div>

                            <input type="text" id="fname" value={firstname} onChange={e => this.setState({ firstname: e.target.value })} placeholder="Firstname" required />
                            <input type="text" id="lname" value={lastname} onChange={e => this.setState({ lastname: e.target.value })} placeholder="Lastname" required />
                            <input type="email" id="email" value={email} onChange={e => this.setState({ email: e.target.value })} placeholder="email" required />
                            <PhoneInput
                                className="w-75"
                                international
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={e => this.setPhone(e)}
                                error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'} />
                            <input type="password" id="pass" value={password} onChange={e => this.setState({ password: e.target.value })} placeholder="password" required />
                            <input type="password" id="cpass" value={repass} onChange={e => this.setState({ repass: e.target.value })} placeholder="ReType-Password" required />
                            <label className="f6 tl">Gender</label>
                            <Radio.Group
                                options={optionsWithDisabled}
                                onChange={this.onChange4}
                                value={gender}
                                optionType="button"
                                buttonStyle="solid"
                                className="f6"
                            />
                            <div className="f6">by clicking on the signUp button, you agree to the <Link href="#" className="blue">terms and conditions</Link>,<Link href="#" className="blue">policy privacy cookies</Link> that covers palscheck</div>
                            <button htmlType="submit" className="pointer">Sign Up</button>
                            <span className="red fw2">{error}</span>
                            <span className="green fw2">{loading===true? <Spin size="large" />:null}</span>
                            <span className="green f6 mt3">
                                {
                                    msg
                                }
                            </span>
                        </form>
        :route === 0?
        <>
        <Verify user={email}/>
        </>
                            :
                            null
                }

            </>

        )
    }
}
export default Register
import React from 'react'
import Register from './Register.jsx'
import LOGO from '../Logo/logofav2.jsx'
import { Alert} from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Verify from './verify'

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            msg:'',
            errormsg:'',
            loading: 0,
            route:1
        }
    }

    componentDidMount() {
        this.switchEffect()
    }
    switchEffect() {
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

    submitFormToLogin = () => {
        this.setState({loading:1})
        this.validatepassword()
    }

    validatepassword = async()=>{
        const Send = await fetch(`${SeverLink}/Authentication/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                username:this.state.email,
                password:this.state.password
            })
        })
        const response = await Send.json()
        if (response.token) {
            this.setState({loading:0})
            localStorage.setItem("token", response.token)
            this.props.UpdateAuth(1)
            this.props.redirectHome(true)
        } else if(response.error) {
            this.setState({loading:0})
            this.setState({errormsg:response.error,msg:''})
        }else if(response.verified) {
            this.setState({loading:0})
            this.setState({msg:response.verified,errormsg:'',route:0})
        }else if(response.delete) {
            this.setState({loading:0})
            this.setState({msg:response.delete,errormsg:''})
        }
   }

   RecoverAcct = async()=>{
       if(this.state.email !== ''){
        const recover = await fetch(`${SeverLink}/Authentication/cancel/Delete/${this.state.email}`)
        const response = await recover.json()
        if(response.success){
            this.setState({msg:'recovered you can now logIn',errormsg:''})
        }
       }
       
   }
    UpadetRoute = e => {
       this.props.UpdateAuth(e)
    }
  
    render() {
        const {msg,errormsg,loading,route,email,password} = this.state
        return(
            <div className="lg53l newfeed--3-art center black">
                
                <div class="container" id="container">

                    {/* register */}
                    <div class="form-container sign-up-container">
                        <Register />
                    </div>

                    {/* login */}
                    <div class="form-container sign-in-container">
                    {
                        route === 1?
                        
                        <div className="signin-box">
                            <h1 className="flex" style={{lineHeight:3}}><LOGO/>Sign in</h1>
                            <div class="social-container">
                            </div>
                            <input type="text" onChange={e=>this.setState({email:e.target.value})} placeholder="Email/username" value={email} required/>
                            <input type="password" onChange={e=>this.setState({password:e.target.value})} placeholder="Password" value={password} required/>
                            <a target="_blank" href="https://forgot-password.palscheck.com/reset-password" className="blue">Forgot your password?</a>
                            <button className="pointer" onClick={this.submitFormToLogin}>Sign In{loading === 1? <Spin indicator={antIcon} />:null}</button>
                           
                                    {errormsg.length > 0?
                                    <Alert message={errormsg} type="error" showIcon />
                                :null}
                            {
                                msg === 'delete' ?
                                    <div>
                                        <Alert
                                            message="Informational Notes"
                                            description="this account has been schedule for delete in 15 days if you still need it click the recover button to recover the account"
                                            type="info"
                                            showIcon
                                        />
                                        <span
                                            onClick={this.RecoverAcct}
                                            class="bg-white blue br0 pa1 mt1 ba h2 w4 pointer db center">Recover</span>
                                    </div> :
                                    msg === 'not verified' ?
                                        <div>
                                            <Alert
                                                message="Warning"
                                                description="this account has not yet been verified please check your email for your verification link"
                                                type="warning"
                                                showIcon
                                                closable
                                            />
                                        </div>
                                        :
                                        <span class="green">
                                            {msg}
                                </span>
                                }
                                <p>Note: this site is on a test run mode all information on this site is for testing purpose and will be deleted after the main site is setup!</p>
                        </div>
                   
                    :route === 0?
                    <Verify user={email}/>
                        :null
                    }
                    </div>


                    <div class="overlay-container">
                        <div class="overlay ">
                            <div class="overlay-panel overlay-left ">
                            <div className="left-overlay"></div>
                                <div className="left-effect">
                                <p>welcome to palscheck</p>
                                <p>Get engage with trends, updates and share your awesome moments with friends, family and fans all over the world</p>
                                <p>We serve the public needs! </p>
                                <button class="ghost db center pointer" id="signIn">Sign In</button>
                               </div>
                                
                                
                            </div>
                            <div class="overlay-panel overlay-right">
                                <div className="right-overlay"></div>
                               <div className="right-effect">
                               <h1 className="white">Palscheck!</h1>
                                <span className="f3 b w-75">We connect you round the globe!</span>
                                <button className="ghost db center pointer" id="signUp">Sign Up</button>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}
export default Login
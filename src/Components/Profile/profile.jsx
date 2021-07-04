import React from 'react'
import ProfileImage from './profileImage/profileImage'
import ProfileCard from './profilecard/profileCard.jsx'
import ProfileNewsFeed from '../Newsfeed/profileNewsfeed/newsfeed.jsx'
import './profile.css'
import NotFound from '../404/404'
import Paywall from './Paywall/paywall'
import Followbtn from '../Follow/followbtn.jsx'
import Helment from '../Helmet/helment'
import SubBtn from '../Subscribe/subscribebtn'
import More from './profileImage/more'

const SeverLink = 'http://localhost:4000'

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
            profiler:[],
            errorpage: 0,
            paywall:false,
            isLoggedIn:[],
            paywallData:[],
            Paywallauthorize:0,
            payWallActive:0,
          
        }
    }
    componentDidMount(){
        try {
            this.checkUrl()
            this.getUserDetails()
            this.getLoggedInUser()
            this.getPayWallDetails() 
             this.checkIFsub()
        this.checkIfPaywallActive() 
        } catch (error) {
            
        }
    }
   
    //check if user has sub
     checkIFsub = async()=>{
    if(this.state.profiler.length > 0){
        const Check = await fetch(`${SeverLink}/PayWall/checkIFsub/subme/${this.state.profiler[0]._id}`,{
            headers:{token:localStorage.token}
        })
        const res = await Check.json()
        if(res.data){
            this.setState({Paywallauthorize:1})
        }else{
          if(this.state.profiler[0]._id === this.state.isLoggedIn){
            this.setState({Paywallauthorize:1})
          }else{
            this.setState({Paywallauthorize:2})
          }
          
        }
    }
}

//check If this user has activated paywall

checkIfPaywallActive = async()=>{
    if(this.state.profiler.length > 0){
        const check = await fetch(`${SeverLink}/PayWall/checkPaywall/Active/${this.state.profiler[0]._id}`,{
        })
        const res = await check.json()
        if(res.data){
            this.setState({payWallActive:1})
        }else{
            this.setState({payWallActive:2})
        }
    }
}

    //checkForUser URL
    checkUrl = async()=>{
        const Url = await fetch(`${SeverLink}/Authentication/Check/Url/${this.props.match.params.id}`)
        const res = await Url.json()
        if(res.error){
            this.setState({errorpage:1})
        }else if(res.success){
            this.setState({errorpage:0})
        }
       
    }

    //getLoggedInuser
    getLoggedInUser = async()=>{
        const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
    }
    getUserDetails = async()=>{
        const Fetchall = await fetch(`${SeverLink}/Authentication/${this.props.match.params.id}`,{
        })
        const response = await Fetchall.json()
        if(response.profiler){
            this.setState({profiler:response.profiler})
        }else{
            this.setState({errorpage:response})
        }

    }
    showpaywall =() =>{
        this.state.paywall === true?
        this.setState({paywall:false}):
        this.setState({paywall:true})
    }
    getPayWallDetails = async() =>{
        const Fetchall = await fetch(`${SeverLink}/Authentication/fetchAll/PaywallDetailsOFuser`,{
            headers:{token:localStorage.token},
        })
        const res = await Fetchall.json()
        if(res.data){
            this.setState({paywallData:res.data})
        }
    }
    render(){
        const {errorpage,profiler,paywallData,Paywallauthorize,payWallActive,isLoggedIn,} = this.state
        
        return(
            <div>
                {
                    profiler.length > 0 ?
                        <Helment title={profiler[0].fullname} description={profiler[0].fullname} />
                    :<Helment title={'profile'} description={'profile'} />
                }
                
                {
                    errorpage === 1 ?
                    <NotFound/>
                    :
                    
                       <>
                        <div className="main">
                            {/* profileimage */ }
                        < div className="profile-cover newfeed--3-art relative">
                        {
                                profiler.map((profile,i)=>{
                                    return(
                                        <ProfileImage
                                        key={profile._id}
                                        coverImg = {profile.coverimg}
                                        />
                                    )
                                })
                            }
                            </div>
                        {/* profile */ }
                        <div className="white w-80 center">
                            {
                                profiler.map((profile,i)=>{
                                    return(
                                        <ProfileCard
                                        key={i}
                                        id={profile._id}
                                        fullname = {profile.fullname}
                                        username={profile.username}
                                        country = {profile.country}
                                        region = {profile.region}
                                        state = {profile.state}
                                        profileimg = {profile.profileimg}
                                        editroute={this.showpaywall}
                                        status={profile.status}
                                        website={profile.website}
                                        />
                                    )
                                })
                            }
                            
                                </div>
                                <div className="followbt flex">
                                    {
                                        profiler.length > 0?
                                        isLoggedIn === profiler[0]._id?
                                        null
                                        :
                                        <Followbtn 
                                        userid={ profiler.length > 0?
                                        profiler[0]._id:null}
                                        followtype={'people'}
                                        />
                                        :
                                        null
                                    }
                                    <div className="ml4">
                                    {
                                        profiler.length > 0?
                                        isLoggedIn === profiler[0]._id?
                                        null
                                        :
                                        <SubBtn userid={ profiler.length > 0?
                                            profiler[0]._id:null}
                                            fullname={ profiler.length > 0?
                                                profiler[0].fullname:null}/>
                                        :
                                        null
                                    }
                                    
                                    </div>
                                    
                                </div>
                        </div>

                        <div className="flex justify-center">
                            {/* profileNewsfeed */ }
                        <div className="feedlayout" style={{width:"55%"}}>
                            <ProfileNewsFeed 
                            address={ profiler.length > 0?
                            profiler[0]._id:null}
                            fullname={ profiler.length > 0?
                            profiler[0].fullname:null}
                            ProfileImg={ profiler.length > 0?
                                profiler[0].ProfileImg:null}
                            id={ profiler.length > 0?
                                profiler[0]._id:null}
                                loggedIn = {this.state.isLoggedIn}
                                Paywallauthorize={Paywallauthorize}
                                payWallActive={payWallActive}
                            />
                                </div>
                               <div className="sidebar w-30">
                               {
                                    payWallActive === 1 ?
                                        profiler[0]._id === isLoggedIn ?
                                            <More photos={profiler.length > 0?profiler[0]._id:null} About={profiler.length > 0?profiler[0].about:null}/>
                                            : Paywallauthorize === 1 ?
                                                <More photos={profiler.length > 0?profiler[0]._id:null} About={profiler.length > 0?profiler[0].about:null}/>
                                                : null
                                        :
                                        <More photos={profiler.length > 0?profiler[0]._id:null} About={profiler.length > 0?profiler[0].about:null}/>
                                }
                               </div>
                            </div>

                        
                        {
                            this.state.paywall === true?
                            <div className="w-30 editing_panel fixed right-0">
                              <div className="edit_pane">
                               <div className="pa1 ml1 f5 fname tc center">my paywall</div>
                                   <Paywall Paywalldata={paywallData} phone={profiler.length > 0?profiler[0].phone:null}/>                         
                              </div>
                        </div>
                            :null
                        }
                        
                       </>
                }
            </div>
        )
    }
}
export default Profile

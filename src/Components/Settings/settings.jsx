import React from 'react'
import Privacy from './Privacy/security.jsx'
import Personalize from './Personalize/personalize'
import Myaccount from './Myaccount/settings'
import PayWall from './Paywall/paywall'


const ServerLink = "https://guarded-anchorage-74785.herokuapp.com"
class Settings extends React.Component{
    constructor(){
        super()
        this.state={
            route:0,
            UserData:[],
            initialPaywall:[]
        }
    }
   
    componentDidMount(){
        this.CheckPayWallDetails()
        setInterval(() => {
            this.FetchAllUserData()
        }, 1000);
    }
    setRoute = (route)=>{
        this.setState({route:route})
    }

    FetchAllUserData = async()=>{
        const fetchData = await fetch(`${ServerLink}/Authentication/FetchAll`,{
            headers:{token:localStorage.token}
        })
        const res = await fetchData.json()
        if(res.data){
            this.setState({UserData:res.data})
        }
    }

    CheckPayWallDetails = async()=>{
        const fetchPaywall = await fetch(`${ServerLink}/PayWall/getUSerPaywallDetails`,{
            headers:{token:localStorage.token},
        })
        const res = await fetchPaywall.json()
        if(res.data){
            this.setState({initialPaywall:res.data})
        }
    }
    render(){
        const {route,UserData,initialPaywall} = this.state
        const {themeToggler} = this.props
        return(
            <div className="center flex w-90 newfeed--3-art">
                {/* side menu */}
                <div className="set_menu w-30 ba ">
                    <div>
                        <li className="bb pa2 tj list ttc link f5 pointer fname" onClick={e=>this.setRoute(0)}>personalize</li>
                        <li className="bb pa2 tj list ttc link f5 pointer fname" onClick={e=>this.setRoute(1)}>my account</li>
                        <li className="bb pa2 tj list ttc link f5 pointer fname" onClick={e=>this.setRoute(2)}>privacy security</li>
                        <li className="bb pa2 tj list ttc link f5 pointer fname" onClick={e=>this.setRoute(3)}>my paywall</li>
                    </div>
                </div>
                {/* setting pannel / info */}
                <div className="set_menu fname w-70 ba">
                    <div>
                        {
                            route === 0?
                            <Personalize theme={themeToggler}/>
                            :route === 1?
                            <Myaccount myData={UserData}/>
                            :route === 2?
                            <Privacy/>
                            :route === 3?
                            <PayWall PaywallData={initialPaywall}/>
                            :null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Settings 

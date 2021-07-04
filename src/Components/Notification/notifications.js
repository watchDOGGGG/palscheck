import React from 'react'
import {Divider} from 'antd'
import NotificationCrd from './notificationCrd.jsx'
import Helmet from '../Helmet/helment'
import Sugesstion from '../Dashboard/Suggestions/suggestions'
import TalksTrends from '../Dashboard/Trendings/trending'
import SideMenu from '../Dashboard/SideContent/side'


const SeverLink = 'http://localhost:4000'
class Notifications extends React.Component{
    constructor(){
        super()

        this.state = {
            notifications:[],
            following:[]
        }
    }

    componentDidMount(){
            this.getNotifications()
    }
    //fetch All notifications
    getNotifications = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/all/notify`,{
            headers:{token:localStorage.token}
        })
        const response = await fetchAll.json()
        if(response.notify){
            this.setState({notifications:response.notify})
        }
    }
    getAllFollowing = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/getAllFollowing/${this.props.userid}`)
        const response = await fetchAll.json()
        if(response.following){
            this.setState({following:response.following})
        }
       
    }
    render(){
        const {userid} = this.props
        const {following,notifications} = this.state
        return (
            <div className="flex justify-center">
                <Helmet title={'notification'} description={'notification'} />
                {/* Newsfeed */}
                <div className="feedlayout newfeed--3-art mr2" style={{ width: "55%" }}>
                    <Divider>
                        <span className="blue">Notifications</span>
                    </Divider>
                    <NotificationCrd notifies={notifications} />
                </div>
                <div className="sidebar w-30">
                    <SideMenu following={following} loggedIn={userid} />
                </div>
                
        </div>
        )
    }
}
export default Notifications
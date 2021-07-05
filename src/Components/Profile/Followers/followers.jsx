import React from 'react'
import { Tabs } from 'antd';
import FollowersTemp from './followersTemp.jsx'
import Following from './followingTemp.jsx';
import { Skeleton } from 'antd';

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const { TabPane } = Tabs;

class Followers extends React.Component{
    constructor(){
        super()

        this.state = {
            followers:[],
            following:[]
        }
    }
    componentDidMount(){
        try {
                this.getAllFollowers()
                this.getAllFollowing()
            
        } catch (error) {
            
        }
    }

    getAllFollowers = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/getAllFollowers/${this.props.userid}`)
        const response = await fetchAll.json()
        if(response.followers){
            this.setState({followers:response.followers})
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
        return(
            <div>
                {/* profileNewsfeed */}
                <article class="center pa3 pa4-ns mv3 ba b--black-10">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Followers" key="1">
                        {this.state.followers.length >0?
                        this.state.followers.map((follower,i)=>{
                           return(
                               <FollowersTemp
                               key={i}
                                follow_from = {this.state.followers[i].follow_from}
                                loggedIn = {this.props.loggedInUser}
                               />
                           ) 
                        })
                    :
                    <p>
                        <Skeleton avatar paragraph={{ rows: 1}} />
                        No followers yet
                        
                    </p>    
                    }
                        
                    </TabPane>
                    <TabPane tab="Following" key="2">
                    {this.state.following.length >0?
                        this.state.following.map((following,i)=>{
                           return(
                               <Following
                               key={i}
                                follow_to = {this.state.following[i].follow_to}
                                loggedIn = {this.props.loggedInUser}
                                follow_type = {this.state.following[i].follow_type}
                               />
                           ) 
                        })
                    :
                    <p>
                        <Skeleton avatar paragraph={{ rows: 1}} />
                        when you follow someone there will appear here
                        
                    </p>     
                    }
                     
                    </TabPane>
                </Tabs>
                </article> 
            </div>
        )
    }
}
export default Followers
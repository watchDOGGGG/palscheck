import React from 'react'
import NewsFeed from '../Newsfeed/Newsfeed/newsfeed'
import SideMenu from '../Dashboard/SideContent/side'
import Helmet from '../Helmet/helment'


const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
class Home extends React.Component{
    constructor(){
        super()

        this.state = {
            following:[]
        }
    }
componentDidMount(){
    this.getAllFollowing()
}
    getAllFollowing = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/getAllFollowing/${this.props.userid}`)
        const response = await fetchAll.json()
        if(response.following){
            this.setState({following:response.following})
        }
       
    }
    
    render(){
        const {userid,ProfileImg} = this.props
        const {following} = this.state
        return(
            <div className="flex justify-center">
                <Helmet title={'NewsFeed'} description={'NewsFeed'}/>
                {/* Newsfeed */}
                <div className="feedlayout" style={{width:"47%"}}>
                    <NewsFeed following={following} loggedIn={userid} ProfileImg={ProfileImg}/>
                </div> 
                <div class="sidebar w-30">
                    <SideMenu following={following} loggedIn={userid} />
                </div>
              
            </div>
        )
    }
}
export default Home
import React from 'react'
import NewsFeedCard from './newsfeedCard.jsx'
import { Tabs } from 'antd';
import PostPannel from '../postPannel/postpannel';
import BookMark from '../Bookmark/BookMars/bookmark.jsx'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'

const { TabPane } = Tabs;

const pollStyle = {
    height:'auto',
    width: '100%',
    overflow: 'hidden',
}
class NewsFeed extends React.Component{
    constructor(){
        super()
       this.state = {
            Feeds:0,
            Auth:0
        }
    }
    componentDidMount(){
        this.CheckLoginsession()
    }
    componentDidUpdate(){
        this.sendUsersToFetchFeed()     
    }
 
    sendUsersToFetchFeed = async()=>{
        
        try {
            const fetchFeed = await fetch(`${SeverLink}/Feed/getFeeds/forMe`,{
                method: 'POST',
                headers:{token:localStorage.token,"content-Type":"application/json"},
                body:JSON.stringify({
                    following:this.props.following
                })
            })
            const res = await fetchFeed.json()
            if(res.feeds){
                this.setState({Feeds:res.feeds})
            }else{
                this.setState({Feeds:2})
            }
        } catch (error) {
            
        }
    }
    CheckLoginsession = async () => {
        const check = await fetch(`${SeverLink}/Authentication/verifyJwt`, {
            headers:{token:localStorage.token},
        })
        const response = await check.json()
        if (response.true) {
            this.setState({ Auth: 1 })
        } else {
            this.setState({ Auth: 0 })
        }
    }
    render(){
      const {Feeds,Auth} = this.state
        return(

                <article class="newfeed--3-art center pa3 pa4-ns mv3 ba b--black-10">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="palsFeed" key="1">
                        {
                            Auth === 1?
                            <PostPannel fullname={this.props.fullname} ProfileImg={this.props.ProfileImg}/>
                            :null
                        }
                        
                        {
                           Feeds === 0?
                           <div className="center tc">
                               <Spin indicator={antIcon} />
                           </div>
                            :Feeds === 2?
                            <div>
                                <h2 className="center tc b f4 ttu blue">Welcome to palscheck</h2>
                                <span className="center tj fw5 f6">Join the largest sharing community, let's keep you updated with trends of your favourite celebrities,family,friends, and help share what you feel</span>
                            </div>
                            :
                            <NewsFeedCard
                            AllFeeds={this.state.Feeds}
                            loggedIn={this.props.loggedIn}
                        />
                        }
                        
                    </TabPane>
                    <TabPane tab="Bookmark" key="4">
                        <BookMark/>
                    </TabPane>
                  
                    <span>end</span>
                </Tabs>
                </article>

        )
    }
}
export default NewsFeed

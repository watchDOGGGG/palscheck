import React from 'react'
import NewsFeedCard from '../Newsfeed/newsfeedCard'
import { Tabs } from 'antd';
import Media from '../../Dashboard/Media/media.jsx'
import PostPannel from '../postPannel/postpannel';
import BookMark from '../Bookmark/BookMars/bookmark.jsx'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const { TabPane } = Tabs;

class NewsFeed extends React.Component{
    constructor(){
        super()
        this.state = {
            Feeds:0,
        }
    }

    componentDidUpdate(){
        this.FetchAllFeed()
    }

    FetchAllFeed = async()=>{
        const fetchFeed = await fetch(`${SeverLink}/Feed/getFeed/${this.props.address}`)
        const res = await fetchFeed.json()
            if(res.feeds){
                this.setState({Feeds:res.feeds})
            }else{
                this.setState({Feeds:2})
            }
    }
    render(){
        const {Feeds} = this.state
        const {payWallActive,Paywallauthorize} = this.props
        
        return(

            <article class="newfeed--3-art center pa3 pa4-ns mv3 ba b--black-10">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={this.props.fullname ? `${this.props.fullname} Feed` : `Feed`} key="1">
                        <PostPannel  fullname={this.props.fullname} ProfileImg={this.props.ProfileImg}/>
                        {
                            Feeds === 0 ?
                                <div className="center tc">
                                    <Spin indicator={antIcon} />
                                </div>
                                : Feeds === 2 ?
                                    <div>
                                        <h2 className="center tc b f4 ttu blue">Welcome to palscheck</h2>
                                        <span className="center tc tj fw5 f6">Join the largest sharing community, let's keep you updated with trends of your favourite celebrities,family,friends, and help share what you feel</span>
                                    </div>
                                    :
                                    <NewsFeedCard
                                        AllFeeds={this.state.Feeds}
                                        loggedIn={this.props.loggedIn}
                                    />
                        }


                    </TabPane>
                    <TabPane tab="Photos" key="2">
                        {
                            payWallActive === 1?
                            Paywallauthorize === 1?
                            <Media
                            fullname={this.props.fullname}
                            id={this.props.id}
                        />
                        :
                        <p>subscribe to this user content to see full gallery and gain access to paid content.</p>
                    :<Media
                    fullname={this.props.fullname}
                    id={this.props.id}
                />    
                    }
                        
                    </TabPane>
                    <TabPane tab="Bookmark" key="4">
                        <BookMark />
                    </TabPane>
                </Tabs>
                </article>

        )
    }
}
export default NewsFeed

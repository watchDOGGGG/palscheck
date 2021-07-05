import React from 'react'
import {BorderlessTableOutlined} from '@ant-design/icons';
import { Tabs } from 'antd';
import FeedbackCrd from './Feedbacks/feedbackCrd'
import PollApp from './memoAp.jsx'
import Helmet from '../Helmet/helment' 
const { TabPane } = Tabs;

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
class Polls extends React.Component{
  constructor(){
    super()
    this.state = {
      polls:[],
      feedback:[]
    }
  }
  componentDidMount(){
      this.getAllFeedback()
  }
  getAllFeedback = async()=>{
    const fetchAll = await fetch(`${SeverLink}/Feed/getFeedback/memo`,{
        headers:{token:localStorage.token}
    })
    const response = await fetchAll.json()
    if(response.feedback){
      this.setState({feedback:response.feedback})
    }
}

    render(){
        return(
            <div>
              <Helmet title={'memos'} description={'memos'}/>
            <span class="mt5 f3 tc"><BorderlessTableOutlined /> Memos</span>

            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="your Memos" key="1">
                <PollApp />
              </TabPane>
              <TabPane tab="feedbacks" key="2">
               <FeedbackCrd feedback={this.state.feedback}/>
    </TabPane>
            </Tabs>
        </div>
    )
  }
}
export default Polls
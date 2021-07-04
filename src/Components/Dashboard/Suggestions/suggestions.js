import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import '../../Layout/layout.css'
import SuggestionList from './suggestionList'
import { Divider } from 'antd';
import {UserSwitchOutlined} from '@ant-design/icons';

const SeverLink = 'http://localhost:4000'
class Suggestions extends React.Component{
    constructor(){
        super()
        this.state = {
            suggestion:[],//if they follow a user the return value of other users will be stored to this state
            suggestionFirstTime:[]//this holds the suggestions of users if the user hasn't follow any one yet
        }
    }


    componentDidMount(){
        setInterval(() => {
            if(this.props.following.length>0){
                this.FetchSugestedUsers()
            }
        }, 2000);
        setInterval(() => {
            this.FetchSugestedUsersFirstTime() 
        }, 4000);
     }
        
     FetchSugestedUsers = async()=>{
        const getUsers = await fetch(`${SeverLink}/Authentication/SuggestUsers/forMe`,{
            method: 'POST',
            headers:{token:localStorage.token,"content-Type":"application/json"},
            body:JSON.stringify({
                following:this.props.following
            })
        })
        const res = await getUsers.json()
        
        if(res.result){
            this.setState({suggestion:res.result})
        }
     }
     FetchSugestedUsersFirstTime = async()=>{
        const getUsers = await fetch(`${SeverLink}/Authentication/SuggestAllUsers/forMe`,{
            headers:{token:localStorage.token},
        })
        const res = await getUsers.json()
        
        if(res.result){
            this.setState({suggestionFirstTime:res.result})
        }
     }
    render(){
        const {suggestion,suggestionFirstTime} = this.state

        return(
            <article class="suggestion-card newfeed--3-art br4 pa2">
                <center orientation="left"><span className="fname tl f5 b fw6 mb4">Suggestions For You</span>&nbsp;<span className="tr"><UserSwitchOutlined /></span></center>
                <div className="card-container">
                    <div class="card__collection clear-fix ">
                        {
                            suggestion.length > 0 ?
                                suggestion.map((users, i) => {
                                    return (
                                        <SuggestionList 
                                        key={i}
                                        name={suggestion[i].fullname}
                                        id={suggestion[i]._id}
                                        username={suggestion[i].username}
                                        profileimg = {suggestion[i].profileimg}
                                        />
                                    )
                                })
                                : suggestion.length < 1?
                                suggestionFirstTime.map((users, i) => {
                                    return (
                                        <SuggestionList 
                                        key={i}
                                        name={suggestionFirstTime[i].fullname}
                                        id={suggestionFirstTime[i]._id}
                                        username={suggestionFirstTime[i].username}
                                        profileimg = {suggestionFirstTime[i].profileimg}
                                        />
                                    )
                                })
                                :null
                        }
                    </div>
                </div>
            </article>
        )
    }
}
export default Suggestions
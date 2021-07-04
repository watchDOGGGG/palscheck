import React, { useState,useEffect } from 'react'
import SingleFeedTemp from '../Newsfeed/newsFeedTemp'
import MetaHead from '../../Helmet/helment'

const SeverLink = 'http://localhost:4000'

const SingleFeed = ({match}) =>{
    const [errorpage,setError] = useState('')
    const [feed,setFeed] = useState([])
    const [isLoggedIn,setLogedIn] = useState([])
  
     
    useEffect(()=>{
        
      })
    
    const GetSinglePost = async()=>{
        const FetchData = await fetch(`${SeverLink}/Feed/single/${match.params.id}`)
        const response = await FetchData.json()
        
        if(response.result){
            setFeed(response.result)
        }else{
            setError('not found')
        }
      }
  
      //getLoggedInuser
    const getLoggedInUser = async()=>{
      const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
          headers:{token:localStorage.token}
      })
      const response = await getLogginUser.json()
      setLogedIn(response)
  }

    
        return(
            <>
            <MetaHead title={`palscheck | ${match.params.title}`} description={match.params.title}/>
            
            <article className="newfeed--3-art center pa3 pa4-ns mv3 ba b--black-10">
                <SingleFeedTemp
                id={match.params.id}
                feedby={feed.feedby}
                loggedIn={isLoggedIn}
                feedFor={feed.feedFor}
                feedType={feed.feedType}
                feedTxt={feed.feedTxt}
                date={feed.date}
                route={'single'}
                />
            </article> 
            </>
        )
    
}
export default SingleFeed
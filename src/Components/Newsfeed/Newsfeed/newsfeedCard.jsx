import React from 'react'
import NewsFeedTemp from './newsFeedTemp.jsx'
const NewsFeedCard = ({AllFeeds,loggedIn})=>{
    return(
        <div>
            {
                AllFeeds.map((feeds,i)=>{
                    return(
                        <>
                        <NewsFeedTemp
                            key={i}
                            id={AllFeeds[i]._id}
                            feedby={AllFeeds[i].feedby}
                            feedTxt={AllFeeds[i].feedTxt}
                            feedType={AllFeeds[i].feedType}
                            feedFor={AllFeeds[i].feedFor}
                            address={AllFeeds[i].address}
                            date={AllFeeds[i].date}
                            loggedIn = {loggedIn}
                        />
                        </>
                    )
                })
            }
        </div>
    )
}
export default NewsFeedCard
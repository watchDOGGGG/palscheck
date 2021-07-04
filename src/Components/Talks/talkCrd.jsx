import React from 'react'
import TalkTemp from './talkTemp'
const TalkCrd = ({talks,isLoggedIn})=>{

    return(
        talks.map((talk,i)=>{
            return(
                <TalkTemp
                key = {i}
                address={talks[i].address}
                user={talks[i].user}
                txt={talks[i].txt}
                date={talks[i].date}
                auth = {isLoggedIn}
                />
            )
        })
    )
}
export default TalkCrd
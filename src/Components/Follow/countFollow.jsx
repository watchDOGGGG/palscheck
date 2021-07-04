import React,{useState,useEffect} from 'react'

const SeverLink = 'http://localhost:4000'
const CountFollow = ({userid})=>{
    const [following,setfollowingCount] = useState([])

    useEffect(()=>{
        GetFollowingCount()
    })

    //following GetPollCount
    const GetFollowingCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/countfollowing/${userid}`)
        const response = await fetchAll.json()
        console.log(response)
        if(response.count){
            setfollowingCount(response.count)
        }
    }
    
    return(
        <>
            {following.count}
        </>
    )
}
export default CountFollow
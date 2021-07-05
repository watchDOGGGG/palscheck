import React,{useState,useEffect} from 'react'

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const CountFollow = ({userid})=>{
    const [followers,setfollowersCount] = useState([])

    useEffect(()=>{
        GetFollowersCount()
    })

    //followers count
    const GetFollowersCount = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/countfollowers/${userid}`)
        const response = await fetchAll.json()
        if(response.count){
            setfollowersCount(response.count)
        }
    }
    return(
        <>
            {followers}
        </>
    )
}
export default CountFollow
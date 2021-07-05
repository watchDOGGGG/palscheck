import React,{useState,useEffect} from 'react'
import {Avatar} from 'antd'
import DefaultImage from '../../Dashboard/Defaults/defaultImage'


const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const FeedbackTmp =({address,from,txt})=>{
    const [userDetails,setUserDt] = useState([])
    const [memo,setMemo] = useState([])


useEffect(()=>{
  UserDetails()
  GetMemo()
})
     //GEt all user additional info
  const UserDetails = async()=>{
    const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${from}`)
      const response = await FetchAllDetails.json()
      if (response.profiler) {
          setUserDt(response.profiler)
        }
    }

    const GetMemo = async()=>{
        const FetchAllDetails = await fetch(`${SeverLink}/Feed/memo_id/${address}`)
      const response = await FetchAllDetails.json()
      if (response.memo) {
        setMemo(response.memo)
        }
    }
    
    return (

      <li class="flex items-center lh-copy pa2 ph0-l bb b--black-10 w-60">
        <DefaultImage name={userDetails.fullname} size={40} src={userDetails.profileimg} />
        <div class="pl3 flex-auto tl">
          <span class="f6 db f-name2">from - {userDetails.fullname}</span>
          <span class="f6 f-name2">Feedback - </span><span class="f5 f-name">{txt}</span>
        </div>
        <div class="feedcrd br3" style={{ backgroundImage: `url(https://source.unsplash.com/collection/${address}/1600x900/daily)` }}>

          <div class="centered f-name">{memo.txt}</div>
        </div>
    </li>
  )

}
export default FeedbackTmp
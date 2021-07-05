import React,{useState,useEffect} from 'react'
import ReadMoreReact from 'read-more-react';
import RandomString from 'randomstring'


const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const randString = RandomString.generate()
const TrendingList = ({address,id,user}) =>{

  const [talkDT,setTalkDT] = useState([])
  const [talkCount,setCount] = useState([])
  
  useEffect(()=>{
      getTalkdtls()
        getTalkCount()      
  },[])


  const getTalkdtls = async()=>{
      const getDetails = await fetch(`${SeverLink}/Feed/getfeedbyid/${address}`)
      const response = await getDetails.json()
      if(response.result){
          setTalkDT(response.result)
      }
  }

  const getTalkCount = async()=>{
    const fetchCount = await fetch(`${SeverLink}/Talk/Talks/Count/${address}`)
    const response = await fetchCount.json()

    setCount(response.count)
  }
  const LeaveTalk = async (address) => {
    const leave = await fetch(`${SeverLink}/Talk//delete/${address}`, {
      headers: { token: localStorage.token }
    })
    const res = await leave.json()
    if (res.deleted) {
      window.location = "/talks"
    }
  }
  const readMore = (
    <span class="db fname2 underline-hover pointer">
    see more...
  </span>
  )
  return (

    talkDT.feedTxt ?
      <li class="pv2">
       
          <span class="fw7 toggle-text fname">{
            <ReadMoreReact text={`#${talkDT.feedTxt}`}
                min={50}
                ideal={60}
                max={100}
                readMoreText={readMore}/>

          }</span>
          
          <span class="db fname2 underline-hover">{talkCount} mentions</span>
          <div>
          <div class="f5 w-20 tc br-pill bg-blue pointer dib tl"><a href={`${talkDT.feedTxt?talkDT.feedTxt:randString}/${address}.talk`}>view</a></div>
          <div class="f5 w-20 tc br-pill bg-blue pointer dib tr ml5"><a onClick={e=>LeaveTalk(address)}>exit</a></div>
      
          </div>
      </li>
      : null
  )
}
export default TrendingList
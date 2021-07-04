import React, { useState,useEffect } from 'react'
import {CaretRightOutlined} from '@ant-design/icons';
import DefaultImage from '../Dashboard/Defaults/defaultImage'
import { Spin } from 'antd';
import { LoadingOutlined ,CheckCircleOutlined} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SeverLink = 'http://localhost:4000'
const Memotemp = ({txt,from,address,key,view})=>{
const [userDetails,setUserDt] = useState([])
const [feedback,setfeedback] = useState([])
const [msg,setmsg] = useState([])
const [load,setload] = React.useState(false)

useEffect(()=>{
        UserDetails()
})
     //GEt all user additional info
  const UserDetails = async()=>{
    const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${from}`)
      const response = await FetchAllDetails.json()
      if (response.profiler) {
          setUserDt(response.profiler)
        }
    }

    const handleChange = (event)=>{
        setfeedback(event.target.value)
    }
    const SendMemoFeedback = async()=>{
        setload(true)
        const sendMemo = await fetch(`${SeverLink}/Feed/Memo/feedback`,{
            method:'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                address: address,
                txt:feedback,
                to:from
            })
        })
        const res = await sendMemo.json()
        if(res.success){
            setfeedback('')
            setmsg('sent..')
            setload(false)
        }
    }

    return (
        <a class="card" href="#!">
            <div class="front" style={{ backgroundImage: `url(https://source.unsplash.com/collection/${address}/1600x900/daily)` }}>
               
                       <span className="pollImg">
                            <DefaultImage size={40} name={userDetails.fullname} src={userDetails.profileimg} alt="palscheck"/>
                       </span>
                <p>{txt}.</p>
                {view === 1?
                <div class="green db"><CheckCircleOutlined /></div>:null    
            }
            </div>
            <div class="back">
                <div>
                    <span className="db  f5"><a href={`${userDetails.username}.pal`}>from-{userDetails.fullname}</a></span>
                    <span className="db gray f6">@{userDetails.username}</span>
                    <p>send Feedback</p>
                    <textarea className="" placeholder="write feedback here.." value={feedback} onChange={e => handleChange(e)}></textarea>
                    <span className="db">{msg}</span>
                    {
                        feedback.length > 0 ?
                            <button onClick={SendMemoFeedback} class="button">send<CaretRightOutlined />{load === true? <Spin indicator={antIcon} />:null}</button>
                            :
                            <button class="button" disabled>send<CaretRightOutlined /></button>
                    }

                </div>
            </div>
        </a>
    )
}
export default Memotemp
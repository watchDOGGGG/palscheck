import React, { useEffect } from 'react'
import { MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SeverLink = 'http://localhost:4000'
const style = {padding: '8px 0' };
const Talkbtn = ({feed_id,title}) =>{

    useEffect(()=>{
    },[])

    const InsertUserToTalk = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Talk/jointalk/user`,{
            method:'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                feedid: feed_id
            })
        })
        const response = await fetchAll.json()
    }
        return(
            <>
            <div style={style}><Link to={`/${title}/${feed_id}.talk`}><MessageOutlined onClick={InsertUserToTalk}/>&nbsp;<span className="f6">talk</span></Link></div>
            </>
            
        )
}
export default Talkbtn

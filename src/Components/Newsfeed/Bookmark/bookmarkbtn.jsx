import React, { useState,useEffect } from 'react'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const style = { background: '', padding: '8px 0' };
const BookMarkbtn = ({feed_id,feed_by})=>{
    const [booked,setbook] = useState([])
    useEffect(()=>{
        checkIfMarked()
    })

    const bookfeed = async()=>{
        const sendbook = await fetch(`${SeverLink}/Feed/bookmark`,{
            method: 'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                feed_id:feed_id
            })
        })
        const response = await sendbook.json()
        if(response.booked){
            setbook(response.booked)
        }
    }

    const checkIfMarked = async()=>{
        const checkMarked = await fetch(`${SeverLink}/Feed/checkforbookmark/${feed_id}`,{
            headers:{token:localStorage.token}
        })
        const response = await checkMarked.json()
        if(response.result){
            setbook(response.result)
        }
    }
    return(
        <>
        {
            booked.length > 1 ?
            <div style={style} className="blue f5 pa1 mt2 flex"><BookmarkIcon /><span className="f6">bookmark</span></div>
            :<div style={style} className="hover-blue flex f5 pa1 mt2"><BookmarkBorderIcon  onClick={bookfeed}/><span className="f6">bookmark</span></div>
        }
            

        </>
    )
}
export default BookMarkbtn
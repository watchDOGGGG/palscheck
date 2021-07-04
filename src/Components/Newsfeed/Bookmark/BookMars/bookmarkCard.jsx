import React from 'react'
import BookMarkTemp from './bookMarks.jsx'

const BookMarkCrd = ({bookmarks})=>{

    return(
        <div>
            {
                bookmarks.map((marks,i)=>{
                    return(
                        <BookMarkTemp
                            key={i}
                            feedid = {bookmarks[i].feed_id}
                        />
                    )
                })
            }
            
        </div>
    )
}
export default BookMarkCrd
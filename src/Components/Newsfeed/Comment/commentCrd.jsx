import React from 'react'
import ParentComment from './parentComment.jsx'

const CommentCrd = ({All_comments})=>{
    return(
        All_comments.map((comment,i)=>{
            return(
                <ParentComment
                    key={i}
                    comment_txt = {All_comments[i].comment_txt}
                    comment_id = {All_comments[i]._id}
                    feed_id = {All_comments[i].feed_id}
                    comment_by = {All_comments[i].comment_by }
                    comment_to = {All_comments[i].comment_to}
                    comment_date = {All_comments[i].date}
                />
            )
        })
    )
}
export default CommentCrd
import React from 'react'
import ChildCommentTmp from './childComment'

const CommentCrd = ({All_rply})=>{
   
    return(
        All_rply.map((comment,i)=>{
            return(
                <ChildCommentTmp
                    key={i}
                    rpl_txt = {All_rply[i].rpl_txt}
                    comment_id = {All_rply[i].comment_id}
                    feed_id = {All_rply[i].feed_id}
                    rpl_by= {All_rply[i].rpl_by }
                    rpl_id= {All_rply[i]._id }
                    rpl_to = {All_rply[i].rpl_to}
                    reply_date = {All_rply[i].date}
                />
            )
        })
    )
}
export default CommentCrd
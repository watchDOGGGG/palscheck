import React from 'react'
import FeedbackTmp from './feedbackTmp.jsx'

const FeedbackCrd =({feedback})=>{
    
        return(
            <div className="center">
            {
                feedback.length > 0 ?
                feedback.map((feed, i) => {
                        return (

                            <FeedbackTmp
                                key={i}
                                address={feedback[i].address}
                                from={feedback[i].from}
                                txt={feedback[i].feedback}

                            />

                        )
                    })
                    :
                    <p>you got no Memo feedbacks</p>
            }
        </div>
        )
    
}
export default FeedbackCrd
import React from 'react'
import Memotemp from './memoTemp.jsx'

const MemoCrd = ({memo})=>{

    return (
        <div className="content">
            {
                memo.length > 0 ?
                    memo.map((Memo, i) => {
                        return (

                            <Memotemp
                                key={i}
                                address={memo[i]._id}
                                from={memo[i].from}
                                txt={memo[i].txt}
                                view={memo[i].view}
                            />

                        )
                    })
                    :
                    <p>you got no Memos yet</p>
            }
        </div>
    )
}
export default MemoCrd
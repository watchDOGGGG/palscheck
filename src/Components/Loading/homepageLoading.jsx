import React from 'react'
import {Skeleton } from 'antd';

const PageLoading =()=>{
    return(
        <div className="center">
        <Skeleton avatar paragraph={{ rows: 4 }} active/>
        <div className="db tc f5">No Content yet start uploading contents or Start following users to see their Contents</div>
    </div>
    )
}
export default PageLoading
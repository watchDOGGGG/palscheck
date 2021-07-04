import React from 'react'
import PalsLogo from '../Logo/palscheck-logo/pals-check-blue-favicon.png'
const Loading = ()=>{
    return(
        <div className="loadingIcon center fixed left-0 right-0 lh-copy" id="breathing-button">
            <img alt="palscheck" src={PalsLogo} className=""/>
        </div>
    )
}
export default Loading
import React from 'react'
import NewPassword from './changepass'
import PayWallPin from './createPaypin'
const Personalize = () => {
    const [route,setRoute] = React.useState(0)

   const setroute = (e)=>{
        setRoute(e)
    }
    return (
        <div className="flex">
            {/* menu */}
            <div className="w-40 br">
                <li className="bb pa2 tj list link f5 pointer" onClick={e=>setroute(0)}>change password</li>
                <li className="bb pa2 tj list link f5 pointer" onClick={e=>setroute(1)}>set paywall Pin</li>
               </div>
             {/* result */}
            <div className="w-60 bl">
                {
                    route === 0 ?
                        <NewPassword />
                        :route === 1?
                        <PayWallPin />
                        : null
                }

            </div>
        </div>

    )
}
export default Personalize
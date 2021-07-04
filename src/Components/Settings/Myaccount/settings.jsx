import React from 'react'
import MyProfilebio from './myprofile'
import MyPhone from './contact'
const Myaccount = ({myData}) => {
    const [route,setRoute] = React.useState(0)

   const setroute = (e)=>{
        setRoute(e)
    }
    return (
        <div className="flex">
            {/* menu */}
            <div className="w-40 br">
                <li className="bb pa2 tj list link f5 pointer" onClick={e=>setroute(0)}>edit profile</li>
                <li className="bb pa2 tj list link f5 pointer" onClick={e=>setroute(1)}>contact info</li>
             </div>
             {/* result */}
            <div className="w-60 bl">
             {route === 0?<MyProfilebio myData={myData}/>:route === 1?<MyPhone myData={myData}/>:null}
            </div>
        </div>

    )
}
export default Myaccount
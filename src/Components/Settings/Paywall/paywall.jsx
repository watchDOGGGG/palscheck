import React from 'react'
import AccountBalanceWalletSharpIcon from '@material-ui/icons/AccountBalanceWalletSharp';
import AddBank from './addBank'

const Paywall = () => {
    const [route,setRoute] = React.useState(0)
    
    React.useEffect(()=>{
    })
    const setroute = (e)=>{
        setRoute(e)
    }

    return (
        <div className="flex">
            {/* menu */}
            <div className="w-40 br">
               
                <li className="bb pa2 tj list link f5 pointer flex" onClick={e => setroute(2)}><AccountBalanceWalletSharpIcon />Activate paywall</li>
            </div>
            {/* result */}
            <div className="w-60 bl">
                {route === 2 ? <AddBank/> : null}
            </div>
        </div>

    )
}
export default Paywall
import React, { useEffect, useState } from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Flutter from './flutter'
import Paystack from './paystack'

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const min = 300
const Payment = ({email}) =>{
const [route,setRoute] = useState(0)
const [payWallDT,setPayWallDt] = useState([])
const [amount,setAmount] = useState('')
const [user,setUser] = useState([])

useEffect(()=>{
    getPayWallDetails()
    setUserDT()
})
const getPayWallDetails = async() =>{
    const Fetchall = await fetch(`${SeverLink}/Authentication/fetchAll/PaywallDetailsOFuser`,{
        headers:{token:localStorage.token},
    })
    const res = await Fetchall.json()
    if(res.data){
        setPayWallDt(res.data)
    }
}
const setUserDT = async () => {
    const setid = await fetch(`${SeverLink}/Authentication/FetchAll`, {
        headers: { token: localStorage.token },
    })
    const response = await setid.json()
    if (response.data) {
        setUser(response.data)
    }
}
return(
        <div>
            <div className="fname">
                <h1 className="center blue ttu tc b f1 pointer">Palscheck pay</h1>
                <div className="route flex ba br3 b--black-10">
                    <div className="route_list w-30 br b--black-10">
                        <li className="ttc f5 fname list pa2 b--black-10 hover-bg-light-blue pointer w-auto bb tc mb3" onClick={e=>setRoute(1)}>Top up my account</li>
                        {/* <li className="ttc f5 fname list pa2 b--black-10 hover-bg-light-blue pointer w-auto bb tc mb3">fund user</li>
                        <li className="ttc f5 fname list pa2 b--black-10 hover-bg-light-blue pointer w-auto bb tc mb3">Donate</li>
                        <li className="ttc f5 fname list pa2 b--black-10 hover-bg-light-blue pointer w-auto bb tc mb3">History</li>
                        <li className="ttc f5 fname list pa2 b--black-10 hover-bg-light-blue pointer w-auto bb tc mb3">Activity</li> */}
                    </div>
                    <div className="route_view w-50 center">
                        {
                            route === 0 ?
                                <div className="center tc">
                                    <p className="f-name f3 tc">we make it easy to process payment on palschek</p>
                                <img className="w-60 center" src="https://htxt.co.za/wp-content/uploads/2019/03/standard-bank-virtual-card.jpg" alt=""/>
                                </div>:
                                route === 1 ?
                                   <div className="center tc">
                                       <div classname="f3 tc">Top up my account</div>
                                    {/* pay with flutter wave or other paymant gateway */}
                                    
                                    <div className="w-80 center bg- ba pa3">
                                        <div className="payment box">
                                            <label htmlFor="">Enter amount to pay</label>
                                            <input onChange={e=>setAmount(e.target.value)} type="number" placeholder="enter amount" className="w-100 pa2 black"/>
                                        </div>
                                            {
                                                amount < min?
                                                <span className="red f6">Minimum deposit amount is {min}</span>
                                                :amount.length > 0?
                                                <div className="dib pa1 mt1">
                                                    {/* <Flutter/> */}
                                                    <Paystack amount={amount} email={user.email}/>
                                                </div>
                                                :null
                                        }

                                    </div>
                                    <div className="mt4">
                                        <img src="https://www.nicepng.com/png/detail/207-2076847_paypal-acceptance-mark-major-credit-card-logos-png.png" alt=""/>
                                    </div>
                                   </div>
                                : null
                        }
                    </div>
                    <div className="route_add  w-20 fname bl b--black-10">
                        <div className="tc pa2">
                            <span>your wallet balance is</span>
                            <span className="db center tc"><AttachMoneyIcon/>{payWallDT.balance}</span>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}
export default Payment
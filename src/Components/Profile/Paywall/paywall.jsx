import React,{useState} from 'react'
import { WalletOutlined,InfoCircleOutlined } from '@ant-design/icons';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {Alert} from 'antd';
import WithDraw from './withdraw/withdraw'

const Paywall =({Paywalldata,phone})=>{
const [route,setRoute]=  useState(false)
    const WithdrawRoute = ()=>{
        route === false?
        setRoute(true):setRoute(false)
    }
    return(
        <div>
            {
                Paywalldata ?
                    <>
                        {/* image */}
                        <div className="ba b--black-20">
                            <div className="f1 gray hover-bg-lightest-blue  w-30 dib">
                                <WalletOutlined />
                            </div>
                            <div className="dib">
                                <span className="b f5 ttc">your paywall balance , </span>
                                <span className="flex f5">
                                    <AttachMoneyIcon />{Paywalldata.balance ? Paywalldata.balance : 0}
                                </span>
                            </div>
                        </div>
                        {/* side amount */}
                        {/* initialize withdrawal */}
                        <div className="mt2">
                            <code className="dib tc blue notifyBackground hover-bg-light-blue br-pill w-25 ml4 pa2 ph2 pointer" onClick={WithdrawRoute}>withdraw</code>
                            <a href="/palscheck/payment" className="dib tc blue notifyBackground hover-bg-light-blue br-pill w-25 ml4 pa2 ph2 pointer">top up</a>
                        </div>
                        {/* details. */}
                        <p className="f6 gray">
                            <div className="pa1 center w-90"><InfoCircleOutlined />
                                your paywall lets you earn from palscheck, money in this wallet can also be use to manage your palscheck account <a className="link light-blue" href="https://help.palscheck.com">learn more about paywall</a>
                            </div>
                        </p>
                        {/* additional info */}

                        {/* set Account */}
                    </>
                    :
                    <p>
                        <Alert
                            type="info"
                            message={"No data"}
                            description={`your paywall is not yet activated`}
                            showIcon
                        />
                    </p>

            }
            {
                route === true ?
                    <WithDraw details={Paywalldata} phone={phone}/>
                    : null
            }
        </div>
    )
}
export default Paywall
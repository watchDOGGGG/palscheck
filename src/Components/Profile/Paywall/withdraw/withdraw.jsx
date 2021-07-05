import React, { useState } from 'react'
import { Spin,Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BankApi from '../../../Settings/Paywall/bankapi'
import { useEffect } from 'react';

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const access_token = "sk_test_0d881e69618486a81c0a9b4ac7848d6be947f9c9"

const maxAmount = 500
const Withdraw = ({details,phone}) =>{
    const [amount,setAmount] = useState(details.balance)
    const [pin,setPin] = useState('')
    const [Bank,setBank] = useState('')
    const [load,setload] = React.useState(false)
    const [error,setError] = React.useState('')
    const [success,setSuccess] = React.useState('')

    useEffect(()=>{
        var Bankarr = BankApi
        Bankarr.map((bank,i)=>{
            return(
                details.bank === bank.code?
                setBank(bank.name):null
            )
        })
    })
    const onFinish = async() =>{
        setload(true)
        setError('')
       if(details.balance > maxAmount){
        if(amount > details.balance){
            setError('your account balance is low for this transaction')
            setload(false)
        }else if(amount < 10 || amount === 0){
            setError('the minimum withdrawal is $10')
            setload(false)
        }else{
            //share percentage
            const sharePen = await fetch(`${SeverLink}/PayWall/ShareAmount/${amount}`,{
                headers:{token:localStorage.token}})
            const Pecentageresult = await sharePen.json()
            if(Pecentageresult.data){
              
            // create recipient
            const createRecipient = await fetch('https://api.paystack.co/transferrecipient',{
                method:'POST',
                port: '443',
                headers: {
                    Authorization: `Bearer ${ access_token }`,
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                    "type": "nuban",
                    "name": details.accountname,
                    "description": "create recipient for this user",
                    "account_number": details.accountnum,
                    "bank_code": details.bank,
                    "currency": "NGN"
                  })
            })
            const res = await createRecipient.json()
            if(res.status == false){
                setError(`sorry this transfer can't be initiated`)
            } else {
                //initiate transfer
                const sendRequest = await fetch('https://api.paystack.co/transfer', {
                    method: 'POST',
                    port: '443',
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` },
                    body: JSON.stringify({
                        "source": "balance",
                        "reason": "Palscheck paywall service",
                        "amount": `${Pecentageresult.data}00`,
                        "recipient": res.data.recipient_code
                    })
                })
                const respond = await sendRequest.json()
              
                if(respond.status == true){
                        
                    const UpdateWithdrawal = await fetch(`${SeverLink}/PayWall/initialize_withdrawal/${amount}`,{
                        headers:{token:localStorage.token},})
                        const Withdrawalres = await UpdateWithdrawal.json()
                        if(Withdrawalres.data){
                            setSuccess('transaction done successfuly')
                                setload(false)
                            const DeleteRecipient = await fetch(`/transferrecipient/${res.data.recipient_code}`,{
                                method:'DELETE',
                                port:'443',
                                headers: {
                                    Authorization: `Bearer ${access_token}`
                                  },
                            })
                            const checkin = await DeleteRecipient.json()
                        }
                }else{
                    setError(`sorry this transfer can't be initiated`)
                    setload(false)
                } 
            }
  
            }
        }
    }else{
        setload(false)
        setError(`sorry your balance is too low for this transaction, you can only withdraw from ${maxAmount}NGN and above`)
      }
    }
    return(
        <div>
            <div>
                <div className="tc center pa2 b f4">Withdrawal</div>
            </div>
            <div className="withdrawal-body w-80 center notifyBackgrond br3">
                <div className="W3det">
                <label htmlFor="pass">Amount</label>
                    <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-100 pa2 br3 black" placeholder="enter amount"/>
                </div>
                <div className="W3det f5">
                    <label htmlFor="pass">phone number</label>
                    <input id="pass" value={phone} type="text" className="w-100 pa2 br3" placeholder="phone number" disabled/>
                </div>
                <div className="W3det">
                <label htmlFor="pass">Bank name</label>
                 
                    <input id="pass" value={Bank} type="text" className="w-100 pa2 br3" placeholder="Bank" disabled />
                    
                </div>
                <div className="W3det">
                <label htmlFor="pass">Account name</label>
                    <input id="pass" value={details.accountname} type="text" className="w-100 pa2 br3" placeholder="Bank card number" disabled/>
                </div>
                
                <div className="W3det">
                <label htmlFor="pass">Account number</label>
                    <input id="pass" value={details.accountnum} type="text" className="w-100 pa2 br3" placeholder="Account name" disabled/>
                </div>
                {/* <div className="W3det">
                <label htmlFor="pass">paywall pin</label>
                    <input id="pass" value={pin} onChange={e=>setPin(e.target.value)} type="password" className="w-100 pa2 br3 black" placeholder="Paywall pin"/>
                </div> */}
                {
                            error.length > 0?
                            <Alert message={error} type="error" showIcon />
                            :null
                        }
                        {
                            success.length > 0?
                            <Alert message={success} type="success" showIcon />
                            :null
                        }
                <div>
                <a class="ml4 mt1 f5 link br-pill notifyBackground ph3 pv2 w-auto dib fw6 white dib tc" onClick={onFinish}>withdraw {load === true? <Spin indicator={antIcon} />:null}</a>
                </div>
            </div>
        </div>
    )
}
export default Withdraw
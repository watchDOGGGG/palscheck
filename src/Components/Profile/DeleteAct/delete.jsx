import { Input,Button } from 'antd'
import React, { useState } from 'react'
import Logo from '../../Logo/logofav.jsx'

const Delete  = ({UpdateAuth})=>{
const [pin,setpin] = useState('')
const [email,setEmail] = useState('')
const [Msg,setMsg] = useState('')
const [Error,setError] = useState('')

const setEmailInput = (event)=>{
    setEmail(event.target.value)
}
const setPinInput = (event)=>{
    setpin(event.target.value)
}
    const DeleteAcct = async()=>{
        const setdel = await fetch('https://guarded-anchorage-74785.herokuapp.com/Authentication/Delete/User',{
            method: 'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body: JSON.stringify({
                pin:pin,email:email
            })
        })
        const response = await setdel.json()
        if(response.success){
            setMsg(response.success)
            setError('')
            localStorage.removeItem("token")
            UpdateAuth(2) 
            
        }else if(response.error){
            setMsg('')
            setError(response.error)
        }
    }
    return (
        <div className="center ba b--black-10 br2 w-60 bg-white pa3 shadow" style={{ height: '70vh' }}>
            <h2 className="b fw6 db tl flex" style={{ lineHeight: '1.3' }}><Logo />Delete Account</h2>
            <p>Note deleting your account restrict you from having access to palscheck services</p>
            <div className="db w-50 center">
                <Input type="email" placeholder="email" value={email} onChange={e => setEmailInput(e)} />
            </div>
            <div className="db w-50 center mt4">
                <Input type="text" placeholder="pin" value={pin} onChange={e => setPinInput(e)} />
            </div>
            <div className="db mt2">
                <Button
                    onClick={DeleteAcct}
                >Delete</Button>
            </div>
            <span className="green db">
                {Msg}
            </span>
            <span className="red db">
                {Error}
            </span>
        </div>
    )
}
export default Delete
import React,{useState} from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, {isValidPhoneNumber } from 'react-phone-number-input'
import TextField from '@material-ui/core/TextField';
import {PhoneOutlined
} from '@ant-design/icons'

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const Phone = ({myData})=>{
    const [phonevalue, setPhoneValue] = useState('')
    const [website, setWebsite] = useState(myData.website)

    const UpdateContact = async()=>{
        const formData = new FormData()
        formData.set('phone',phonevalue)
        formData.set('website',website)
            const setNum= await fetch(`${SeverLink}/Patch/myProfileBio`,{
                method:'PATCH',
                headers:{token:localStorage.token},
                body:formData
            })
            const response = await setNum.json()
          
    }
    //set Phone field
    const setPhone = (e) =>{
        setPhoneValue(e)
    }
     //set Phone field
     const setWebsiteAddress = (e) =>{
        setWebsite(e.target.value)
    }
    return (
        <div>
            {/* phone contact */}
            <div class="pa2 ph2 f6">
                <div className="f4 ttc tc fw6">Phone Info</div>
                <span>phone</span>
                <PhoneInput
                    className="pa3 ba br3 w-90 center newfeed--3-art"
                    international
                    placeholder="Enter phone number"
                    value={phonevalue}
                    onChange={e=>setPhone(e)}
                    error={phonevalue ? (isValidPhoneNumber(phonevalue) ? undefined : 'Invalid phone number') : 'Phone number required'} />
            <span className="gray f6 dim sm db"><PhoneOutlined/> your phone number is {myData.phone}</span>
            </div>

            <hr/>
            {/* email`     */}
            <div class="pa2 ph2 f6">
                <div className="f6">Email address:</div>
                <input value={myData.email} id="outlined-basic"  className="newfeed--3-art pa1 ttc f6 w-70 f-name" disabled/>
            </div>     
            <hr/>
            {/* website */}
            <div class="pa2 ph2 f6">
                <div className="f6">website address:</div>
                <input value={website} onChange={e=>setWebsiteAddress(e)}  className="newfeed--3-art pa1 ttc f6 w-70 fname" placeholder="https://website"/>
            </div>  
            <a class="ml4 f5 link br-pill bg-light-blue ph3 pv2 w-auto dib fw6 white" onClick={UpdateContact}>Save</a>
                    
                   
            
        </div>
    )
}
export default Phone
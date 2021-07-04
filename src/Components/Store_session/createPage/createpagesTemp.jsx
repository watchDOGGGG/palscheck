import React, { useState } from 'react'
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import Form4 from './Form4'
import { Spin, Space } from 'antd';

const localLink = 'http://localhost:4000'
const SeverLink = 'https://still-cover-backend.uc.r.appspot.com'

const PageTemp = () => {
    const [name,setname] = useState([])
    const [desc,setdesc] = useState([])
    const [about,setabout] = useState([])
    const [count, setCount] = useState(0)
    const [time, settime] = useState([])
    const [country, setcountry] = useState([])
    const [region, setregion] = useState([])
    const [address1, setaddress1] = useState([])
    const [address2, setaddress2] = useState([])
    const [creating,setcreating] = useState(0)
    const [newaddress, setnewaddress] = useState([])

    const IncrementCount = () => {
        setCount(count + 1)
    }
    const DecrementCount = () => {
        setCount(count - 1)
    }
    const SetName = (val)=>{
        setname(val.target.value)
        
    }
    const SetDesc = (val)=>{
        setdesc(val)
        
    }
    const SetTime = (val)=>{
        settime(val)
        
    }
    const SetAbout = (val)=>{
        setabout(val.target.value)
        
    }
    const SetCountry = (val)=>{
        setcountry(val)
        
    }
    const SetRegion = (val)=>{
        setregion(val)
        
    }
    const SetAddress1 = (val)=>{
        setaddress1(val.target.value)
        
    }
    const SetAddress2 = (val)=>{
        setaddress2(val.target.value)
        
    }

    const FinishSubmit= async()=>{
        setcreating(1)
        const SendData = await fetch(`${SeverLink}/Page/`,{
            method: 'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body:JSON.stringify({
                page_name:name,
                desc:desc,
                about:about,
                time:time,
                country:country,
                region:region,
                address1:address1,
                address2:address2,
            })
        })
        const response = await SendData.json()
        if(response.success){
            setcreating(2)
            setnewaddress(response.address)
        }

    }
    return (
        <div>
            <div class='signup-container'>
                <div class='left-container'>
                    <h1 className="tj white">
                        A few clicks away from <br />creating your <br />company or brand.
    </h1>
                    <span className="absolute bottom-1 f5 white right_desc">
                        start your company in minutes save time and money
    </span>
                    <div class='puppy'>
                    </div>
                    <div class='puppyoverlay'>
                    </div>

                </div>
                <div class='right-container'>
                    {
                        creating === 1?
                            <div className="center mt5 spin flex">
                                <Space size="middle">
                                    <Spin size="large" />
                                    <span>creating page..</span>
                                </Space>
                                
                            </div>
                        :creating === 2?
                                <div className="center mt5 spin ">
                                    <p className="f2 ttu">your page {name} has been created</p>
                                    <p className="link bg-blue white pa1 w-30 br2 tc"><a href={`${newaddress}.page`}>Explore</a></p>
                                </div>
                        :
                        <>
                        <header>
                        {
                            count === 0 ?
                                <Form1 SetName={SetName} name={name}/>
                                : count === 1 ?
                                    <Form2 SetDesc={SetDesc} SetAbout={SetAbout} desc={desc} about={about}/>
                                    : count === 2 ?
                                        <Form3 SetCountry={SetCountry} SetRegion={SetRegion} country={country} region={region}
                                        address1={address1} address2={address2} SetAddress1={SetAddress1} SetAddress2={SetAddress2}
                                        />
                                        : count === 3 ?
                                            <Form4 SetTime={SetTime} time={time}/>
                                            : null
                        }

                    </header>

                    <footer>
                        <div class='set'>
                            {
                                count === 0?
                                    <>
                                     {
                                            name.length > 0?
                                            <button id='next' className="pointer" onClick={IncrementCount}>Next</button>
                                            :
                                            <button id='next' className="pointer" disabled>Next</button>
                                        }
                                    </>
                                    : count === 1 ?
                                    <>
                                    {
                                           desc.length > 0 && about.length >0?
                                           <>
                                           <button id='back' className="pointer" onClick={DecrementCount}>Back</button>
                                           <button id='next' className="pointer" onClick={IncrementCount}>Next</button>
                                           </>
                                           :
                                           <>
                                           <button id='next' className="pointer" disabled>Next</button>
                                           <button id='back' className="pointer" onClick={DecrementCount}>Back</button>
                                           </>
                                       }
                                   </>
                                : count === 2 ?
                                <>
                                 {
                                           country.length > 0 && region.length >0 && address1.length > 0 && address2.length >0?
                                           <>
                                           <button id='back' className="pointer" onClick={DecrementCount}>Back</button>
                                           <button id='next' className="pointer" onClick={IncrementCount}>Next</button>
                                           </>
                                           :
                                           <>
                                           <button id='next' className="pointer" disabled>Next</button>
                                           <button id='back' className="pointer" onClick={DecrementCount}>Back</button>
                                           </>
                                       }
                                </>
                        : count === 3?
                        <>
                         {
                                   time.length >0?
                                   <>
                                   <button id='back' className="pointer" onClick={DecrementCount}>Back</button>
                                   <button id='next' className="pointer" onClick={FinishSubmit}>Finish</button>
                                   </>
                                   :
                                   <>
                                   <button id='next' className="pointer" disabled>Finish</button>
                                   <button id='back' className="pointer" onClick={DecrementCount}>Back</button>
                                   </>
                               }
                        </>
                :null

                            }
                            
                            
                        </div>
                    </footer>
                        </>
                    }
                </div>
            </div>

        </div>
    )

}
export default PageTemp
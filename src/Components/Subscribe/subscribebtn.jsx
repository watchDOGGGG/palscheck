import React, { useState,useEffect } from 'react'
import { Alert, Modal} from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const localLink = 'http://localhost:4000'
const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const SubBtn =({userid,subsc,fullname})=>{

    const [btnroute,setbtnroute] = useState(0)
    const [pin,setPin] = useState('')
    const [load,setLoad] = useState(false)
    const [error,setError] = useState('')
    const [visible,setVisible] = React.useState(false)
    const [modalRoute,setmodalRoute] = React.useState(0)
    const [msg,setMsg]= React.useState('')
  
    useEffect(()=>{
        checkIFsub()
    })
      const showModal = () => {
        setVisible(true);
      };
     
      const handleCancel = e => {
        setVisible(false);
      };
   
    const subME = async()=>{
        setLoad(true)
        const sub = await fetch(`${SeverLink}/PayWall/paywall/subME`,{
            method:'POST',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body:JSON.stringify({
                PIN:pin,
                userto:userid
            })
        })
        const res = await sub.json()
        if(res.data){
            setLoad(false)
            setError('')
            setMsg(res.data)
            setbtnroute(1)
        }else if(res.error){
            setLoad(false)
            setError(res.error)
        }else{
            setLoad(false)
        }
    }

    const checkIFsub = async()=>{
        const Check = await fetch(`${SeverLink}/PayWall/checkIFsub/subme/${userid}`,{
            headers:{token:localStorage.token}
        })
        const res = await Check.json()
        if(res.data){
            setbtnroute(1)
        }else{
            setbtnroute(0)
        }
    }
    return (
        <div>
            {
                btnroute === 1 ?
                
                <a class="f6 grow no-underline br-pill ph3 pv1 mb2 dib bg-dark-red">subscribed</a> :
                   
                    <a class="f6 grow no-underline br-pill ph3 pv1 mb2 dib bg-dark-red" onClick={showModal}>subscribe</a>
            }
              <Modal
          visible={visible}
          onCancel={handleCancel}
          width={400}
          footer={[
            
          ]}
        >
        <div className="center">
            <span className="db f6 dim gray sm">your about to subscribe NGN 300 to {fullname} to gain access to their paid content</span>
        <input type="pin" placeholder={"your pin here"} onChange={e=>setPin(e.target.value)}/>
        <a class="f6 grow no-underline br-pill ba ph3 pv1 mb2 dib white bg-blue" onClick={subME}>subscribe{load === true?<Spin indicator={antIcon}/>:null}</a>
        
        </div>
        <div className="db">
            {
                        error.length > 0 ?
                            <Alert
                                type="error"
                                description={error}
                            />
                
                : msg.length > 0 ?
                <Alert
                    type="success"
                    description={msg}
                />
                :null
            }
            
        </div>
        </Modal>
        </div>
    )
}
export default SubBtn
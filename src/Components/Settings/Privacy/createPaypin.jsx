import React,{useState} from 'react'

const CreatePayWallPin = ()=>{

    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')
    const [pin, setPin] = useState('')
    const [cpin, setCpin] = useState('')
    const [load,setLoad] = useState(false)

    const submitForm = async(e)=>{
        
        e.preventDefault(e)
        setLoad(true)
        const CreatePin = await fetch('http://localhost:4000/Authentication/set/PayPin',{
            method:'PATCH',
            headers:{"Content-Type":"application/json",token:localStorage.token},
            body:JSON.stringify({
                Mypin:pin,
                cpin:cpin
            })
            
        })
        
        const res = await CreatePin.json()
        if(res.error){
            setError(res.error)
            setMsg('')
            setLoad(false)
        }else if(res.data){
            setMsg(res.data)
            setError('')
            setLoad(false)
        }else{
            setError('')
            setMsg('')
            setLoad(false)
        }
    }
    return(
        <div>
             <main class="pa4">
                    <form class="measure center" onSubmit={submitForm}>
                        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                            <legend class="f4 fw6 ph0 mh0">Create paywall pin</legend>
                            <span>note this pin will be your authorization for any transaction on palscheck, so keep it to yourself</span>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">Create pin</label>
                                <input onChange={e=>setPin(e.target.value)} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                            <div class="mv3">
                                <label class="db fw6 lh-copy f6" for="password">Comfirm pin</label>
                                <input onChange={e=>setCpin(e.target.value)} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div class="">
                            <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Done"/>
                        </div>
                        <span className="red">
                            {error}
                        </span >
                        <span className="green">
                            {msg}
                        </span>
                        {
                            load === true?
                            <span>creating....</span>
                            :null
                        }
                    </form>
                </main>
        </div>

    )
}
export default CreatePayWallPin
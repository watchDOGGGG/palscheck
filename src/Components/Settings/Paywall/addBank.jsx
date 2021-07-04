import React from 'react'
import { Select,DatePicker } from 'antd';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import { Spin,Alert } from 'antd';
import { BorderVerticleOutlined, LoadingOutlined } from '@ant-design/icons';
import BankApi from './bankapi'
const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const AddBankDetails = () =>{
const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
const [Bankname, setBankname] = React.useState('');
const [lastname, Setlastname] = React.useState('');
const [firstname, setFirstname] = React.useState('');
const [Accountnum, setAccountnum] = React.useState('');
const [secret1, setsecret1] = React.useState('');
const [secretans1, setsecretans1] = React.useState('');
const [Bvn, setbvn] = React.useState('');
const [load,setload] = React.useState(false)
const [error,setError] = React.useState('')
const [success,setSuccess] = React.useState('')

function onChangeDate(date, dateString) {
    setSelectedDate(dateString)
  }

  const onFinish = async() =>{
    setload(true)
    //check bvn 
    const verifyBvn = await fetch('https://api.paystack.co/bvn/match',{
        method:'POST',
        headers: {
            Authorization: 'Bearer sk_test_0d881e69618486a81c0a9b4ac7848d6be947f9c9',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            "bvn":Bvn,
            "account_number": Accountnum,
            "bank_code": Bankname,
            "first_name": "bojack",
            "last_name": "horseman"
          })
    })
    const res = await verifyBvn.json()
    if(res.status == false){
        setError(res.message)
    }else{
    if(res.data.account_number == false){
        setError('the details does not corespond with the information on your bvn')
        setload(false)
    }else if(res.data.is_blacklisted == true){
        setError('Sorry this BVN cant be verified')
        setload(false)
    }else{
        // check if bank account belongs to that bank
        const resolveAcct = await fetch(`https://api.paystack.co/bank/resolve?account_number=${Accountnum}&bank_code=${Bankname}`,{
            headers: {
                Authorization: 'Bearer sk_test_0d881e69618486a81c0a9b4ac7848d6be947f9c9'
              }
        })
        const res = await resolveAcct.json()
        if(res.status == false){
            setError(`This account number doesn't match any record for the bank`)
            setload(false)
        }else{
        setError('')
//   send to backend
    const senData = await fetch('http://localhost:4000/PayWall/CreatePayAct',{
        method:'POST',
        headers:{"Content-Type":"application/json",token:localStorage.token},
        body:JSON.stringify({
            bname:Bankname,
            fname:firstname,
            lname:lastname,
            qes:secret1,
            ans:secretans1,
            DOB:selectedDate,
            acctnum:Accountnum,
            bvn:Bvn
        })
    })
    const res = await senData.json()
    if(res.error){
        setError(res.error)
        setload(false)
    }else if(res.data){
        setError('')
        setSuccess('your account has been verified successfully')
        setload(false)
        }
    }
     
            
}  
}
  
  }
    return (
        <div className="pa1 ">
            <h3 className="f6 blue">Make sure to fill your legal info</h3>
            <span className="f6 gray dim">as this will be use to process your transactions on palscheck</span>

            {/* form */}
            <div className="w-80 center">

                {/* acct name */}
                <div className="mt2 pa1 center">
                    <label htmlFor="pass">First name</label>
                    <input onChange={e => setFirstname(e.target.value)} value={firstname} className="w-100 newfeed--3-art pa2" placeholder="first name" />
                </div>
                <div className="mt2 pa1 center">
                    <label htmlFor="pass">Last name</label>
                    <input onChange={e => Setlastname(e.target.value)} value={lastname} className="w-100 newfeed--3-art pa2" placeholder="last name" />
                </div>

                {/* acct number */}
                <div className="mt2 pa1 center">
                    <label htmlFor="pass">Account number</label>
                    <input onChange={e => setAccountnum(e.target.value)} value={Accountnum} className="w-100 newfeed--3-art pa2" placeholder="Account number" />
                </div>
                {/* bankname */}
                <div className="mt2 pa1 center">
                    <label htmlFor="pass">Select Bank</label>
                    <Select
                        onChange={e => setBankname(e)}
                        className="newfeed--3-art"
                        style={{ width: '100%' }}
                        placeholder="Select Bank"
                    >
                        {
                            BankApi.map((src, i) => {
                                return (
                                    <Option value={src.code}>{src.name}</Option>

                                )
                            })
                        }
                    </Select>
                </div>
                {/* bvn */}
                <div className="mt2 pa1 center">
                    <label htmlFor="pass">Bvn (bank verification number)</label>
                    <input onChange={e => setbvn(e.target.value)} value={Bvn} className="w-100 newfeed--3-art pa2" placeholder="BVN (bank verification number)" />
                </div>
                {/* dob */}
                <div className="mt2 pa1 center">
                    <label htmlFor="pass">D.O.B</label>
                    <DatePicker onChange={onChangeDate} className=" w-100" />
                </div>{/* acct number */}
                {/* secret */}
                <div className="mt2 pa1 center" className="newfeed--3-art">
                    <label htmlFor="pass">Secret question</label>
                    <Select
                        className="newfeed--3-art"
                        style={{ width: '100%' }}
                        placeholder="Select secret"
                        optionFilterProp="children"
                        onChange={e => setsecret1(e)}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="what city did you live in first">what city did you live in first</Option>
                        <Option value="what was your childhood pet nam">what was your childhood pet name</Option>
                        <Option value="how old where you when your first locatio">how old where you when your first location</Option>
                        <Option value="where did you first start your carree">where did you first start your carree</Option>
                        <Option value="where did you spend your honeymoon">where did you spend your honeymoon</Option>
                    </Select>
                    <input onChange={e => setsecretans1(e.target.value)} value={secretans1} className="w-100 newfeed--3-art pa2" placeholder="Secrete answer" />
                </div>


                {
                    error.length > 0 ?
                        <Alert message={error} type="error" showIcon />
                        : null
                }
                {
                    success.length > 0 ?
                        <Alert message={success} type="success" showIcon />
                        : null
                }
                <a class="ml4 mt1 f5 link br-pill notifyBackground ph3 pv2 w-30 dib fw6 white dib tc" onClick={onFinish}>Done {load === true ? <Spin indicator={antIcon} /> : null}</a>
            </div>

        </div>
    )
}
export default AddBankDetails
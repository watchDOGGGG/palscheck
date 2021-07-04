import React from 'react';
  import { PaystackButton } from 'react-paystack';

  
  
  const ServerLink = "http://localhost:4000"
  const Paystack = ({amount,email})=> {
    // you can call this function anything
    const handlePaystackSuccessAction = async(reference) => {
      // Implementation for whatever you want to do with reference and after success call.
      if(reference.status == "success"){
            const sendPayment = await fetch(`${ServerLink}/PayWall/topup/paywall`,{
              method:'POST',
              headers:{"Content-Type":"application/json",token:localStorage.token},
              body:JSON.stringify({
                gateway: 'paystack',
                amount: amount,
                transaction_id: reference.reference,
                tx_ref: reference.trxref,
                currency: 'NGN',
              })
            })
            const res = await sendPayment.json()
            if(res.data){
                handlePaystackCloseAction()
            }
        }
      
    };
    const config = {
        reference: (new Date()).getTime(),
        email: email,
        amount: `${amount}00`,
        publicKey: 'pk_test_e60ab3f0800adba307ad9f5e63c56ce5e29a05b0',
      };
    // you can call this function anything
    const handlePaystackCloseAction = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'pay with PayStack',
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };

    return (
      <div className="">
        <PaystackButton {...componentProps} className="notifyBackground b--black-10 br-pill ttl pointer pa2 f5"/>
      </div>
    );
  }
  
  export default Paystack;

 
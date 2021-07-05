import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const ServerLink = "https://guarded-anchorage-74785.herokuapp.com"
export default function App() {
  const config = {
    public_key: 'FLWPUBK_TEST-c77c92785092dba3e39177fe331850a9-X',
    tx_ref: Date.now(),
    amount: null,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'odurandyjnr@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'Palscheck',
      description: 'Top up my palscheck paywallet',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const processData = async(response)=>{
    if(response.status === "successful"){
        const sendPayment = await fetch(`${ServerLink}/PayWall/topup/paywall`,{
          method:'POST',
          headers:{"Content-Type":"application/json",token:localStorage.token},
          body:JSON.stringify({
            gateway: 'flutter',
            amount: response.amount,
            transaction_id: response.transaction_id,
            tx_ref: response.tx_ref,
            currency: response.currency,
          })
        })
        const res = await sendPayment.json()
        if(res.data){
          closePaymentModal() // this will close the modal programmatically
        }
    }else{
        closePaymentModal() // this will close the modal programmatically
    }
  }
  return (
    <div className="App">
     <h5 className="dim sm">make sure to read the palscheck pay terms and service.</h5>

      <button
      className="notifyBackground b--black-10 br-pill ttl pointer pa2 f5"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               processData(response);
            },
            onClose: () => {},
          });
        }}
      >
        Flutter wave
      </button>
    </div>
  );
}

// {status: "successful", customer: {…}, transaction_id: 2020297, tx_ref: 1618017043176, flw_ref: "456831618017098972", …}
// amount: 300
// currency: "NGN"
// customer: {name: "joel ugwumadu", email: "odurandyjnr@gmail.com", phone_number: null}
// flw_ref: "456831618017098972"
// status: "successful"
// transaction_id: 2020297
// tx_ref: 1618017043176
// __proto__: Object
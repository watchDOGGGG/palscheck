import React from 'react'
import NotificationTemp from './notificationTemp.jsx'

const NotificationCrd = ({notifies})=>{


    return(
        <div>
            {
                notifies.map((notify,i)=>{
                    return(
                        <NotificationTemp
                        key={i}
                        addressFrom={notifies[i].addressFrom}
                        notify_from={notifies[i].notify_from}
                        notify_for={notifies[i].notify_for}
                        notify_action={notifies[i].notify_action}
                        notify_content={notifies[i].notify_content}
                        id={notifies[i]._id}
                        viewed={notifies[i].viewed}
                        date={notifies[i].date}
                        />
                    )
                })
            }
        </div>
    )
}
export default NotificationCrd
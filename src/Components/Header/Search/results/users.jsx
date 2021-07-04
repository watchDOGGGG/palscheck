import React,{useEffect,useState} from 'react'
import { Avatar } from 'antd';
import Followbtn from '../../../Follow/followbtn.jsx'
import DefaultImage from '../../../Dashboard/Defaults/defaultImage';

const Users =({result,isLoggedIn})=>{
    return(
        result.length > 0?
        result.map((user,i)=>{
            return(
                <main class="mw6 center">
                    <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                       
                       <div class="dtc w2 w3-ns v-mid">
                          
                          {
                                user.profileimg ?
                                    <Avatar size={40} src={user.profileimg} />
                              :<DefaultImage name={user.fullname} size={40}/>
                          }
                               
                              
                            </div>
                        
                        <div class="dtc v-mid">
                        <a href={`/${user.username}.pal`}>
                            <div class="f6 f5-ns fw3 lh-title mv0 tl">{user.fullname} </div>
                            </a>
                            <div style={{fontSize:'12px'}} class="dim sm mt0 mb0 f-name2 tl">@{user.username}</div>
                        </div>
                        {
                            isLoggedIn?
                            isLoggedIn !== user._id ?
                                <div class="dtc v-mid">
                                    <div class="w-100 tr">

                                        <Followbtn userid={user._id} followtype={'people'}/>
                                    </div>
                                </div>
                                :
                                null
                            :null
                        }
                    </article>
                </main>

            )
        })
            : <p>nothin here</p>
    )
}
export default Users
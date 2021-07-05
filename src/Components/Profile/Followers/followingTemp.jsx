import Avatar from 'antd/lib/avatar/avatar'
import React, { useState,useEffect } from 'react'
import Followbtn from '../../Follow/followbtn.jsx'

const localLink = 'http://localhost:4000'
const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const Following = ({follow_to,loggedIn,follow_type}) =>{
  const [userDetail,setUserDt] = useState([])

  useEffect(()=>{
    UserDetails()
  })
      //GEt all user additional info
      const UserDetails = async()=>{
        const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${follow_to}`)
          const response = await FetchAllDetails.json()
          if (response.profiler) {
              setUserDt(response.profiler)
            }
        }
        //GEt all data info for page post
  
  return (
    <article className="center mv3 b--black-10">
      {
        follow_to ?
          <main class="mw6 center">
            {
              follow_type === 'people' ?
                <article class="dt w-100 bb b--black-05 pb2 mt2" >
                  <a href={`${userDetail.username}.pal`}>
                 {
                    userDetail.profileimg ?
                      <Avatar size='large' src={userDetail.profileimg} />
                      :
                      <Avatar size='large' />
                  }
                  <div class="dtc v-mid pl3 tl">
                    <div class="f6 f5-ns fw4 lh-title mv0 tl  f-name">{userDetail.fullname}</div>
                    {userDetail.profession ?
                      <span class="f6 fw4 mt0 mb0  f-name2">#{userDetail.profession[0].skill}</span>
                      : null
                    }

                  </div>
                 </a>

                  <div class="dtc v-mid">
                    <div class="w-100 tr">
                      {
                        loggedIn === follow_to ?
                          null
                          :
                          <Followbtn userid={userDetail._id} />
                      }

                    </div>
                  </div>
                </article>
                :
                null
            }

          </main>
          : null
      }

    </article>
  )
}
export default Following 

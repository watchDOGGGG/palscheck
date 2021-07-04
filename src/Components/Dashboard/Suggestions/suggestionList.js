import React from 'react'
import FollowBtn from '../../Follow/followbtn'
import DefaultImg from '../Defaults/defaultImage'

const SuggestionList =({name,username,id,profileimg})=>{

    return (
        <main class="mw6 center">
          <article class="dt w-100 pb2 mt2" href="#0">
            <div class="dtc w2 w3-ns v-mid">
              {
                profileimg?
                <img src={profileimg} class="img-responsive" alt={name} />
                :<DefaultImg name={name} size={40}/>
              }
             
            </div>
            <div class="dtc v-mid pl3">
              <a href={`${username}.pal`}>
              <div class="f6 f6-ns fw5 lh-title fname mv0">{name}</div>
              <div class="f6 fw2 mt0 mb0 f-name2">@{username}</div>
              </a>
            </div>
            <div class="dtc v-mid tr">
              <FollowBtn userid={id} followtype={'people'} />
            </div>
          </article>
        </main>
    );
  
}

export default SuggestionList

import React from 'react'
import Helmet from '../Helmet/helment'
const NotFound = ()=>{

    return(
        <div className="not45n">
            <Helmet title={'Not Found'} description={'this page is not available'}/>
            <section id="not-found">
                <div class="circles">
                <p>404<br/>
                <small>PAGE NOT FOUND</small>
                </p>
                <span class="circle big"></span>
                <span class="circle med"></span>
                <span class="circle small"></span>
                </div>
            </section>

        </div>
    )
}
export default NotFound

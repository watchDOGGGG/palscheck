import React from "react";
import {Helmet} from "react-helmet";
 
const MetaHead = ({title,description})=>{
    return (
            <Helmet>
                {/* <meta charSet="utf-8" data-react-helmet="true"/> */}
                <title>{title}</title>
                <meta name="description" content={description} data-react-helmet="true"/>
            </Helmet>
    );
  }
export default MetaHead
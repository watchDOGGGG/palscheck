import React, { useEffect, useState } from 'react'
import ReadMoreReact from 'read-more-react';

const SeverLink = 'http://localhost:4000'
const AllPhotos = ({photos,About}) =>{
    const [myPhoto,setPhotos] = useState([])
    
    useEffect(()=>{
        GetAllUserPhoto()
    })

//GET ALL USER PHOTO
const GetAllUserPhoto = async()=>{
    if(photos){
        const getALL = await fetch(`${SeverLink}/Feed/getAll/userMedia/${photos}`,{})
    const res = await getALL.json()
    if(res.data){
        setPhotos(res.data)
    }
    }
    
}
    
    const readMore = (
        <span class="f-name underline-hover pointer f6">
        see more...
      </span>
      )
    return (
        <div className="trends w-100">
            {/* About */}
            <div className="mt2 newfeed--3-art br4 pa2">
                <center orientation="left"><span className="fname tl f5 b mb4">Intro</span>&nbsp;<span className="tr"></span></center>

                <div className="mt2">
                    {
                        About ?
                            <p className="pa3"><ReadMoreReact text={About}
                                min={89}
                                ideal={90}
                                max={1000}
                                readMoreText={readMore} /></p>
                            : null
                    }

                </div>
            </div>

            {/* photos */}
            <div className="mt2 newfeed--3-art br4 pa2">
                <center orientation="left"><span className="fname tl f5 b mb4">Photos</span>&nbsp;<span className="tr"></span></center>

                <div className="mt2">
                    {
                        myPhoto ?
                            myPhoto.map((imgrs, i) => {
                                return (
                                    <>
                                        {
                                            imgrs.feedMedia_type === "image/jpeg" || imgrs.feedMedia_type === "image/jpg" || imgrs.feedMedia_type === "image/png" ?
                                                <div class="wrapper dib">
                                                    <div class="clips"><img className="br3" src={imgrs.url} /></div>
                                                </div>
                                                : null
                                        }
                                    </>
                                   
                                    
                                )
                            }) : null
                    }
                </div>
            </div>

        </div>
    )
}
export default AllPhotos
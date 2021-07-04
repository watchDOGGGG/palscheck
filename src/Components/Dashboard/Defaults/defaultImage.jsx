import React,{useEffect} from 'react'
import LetteredAvatar from 'lettered-avatar'


const DefaultImage = ({name,size,src})=>{

    return (
        <>
        <LetteredAvatar name={name} id="profileImage" imgSrc={src}
        options={{  
            size: size, 
            twoLetter: true,
            shape: 'round',
            bgColor: '', 
            href: '', 
            target: '_blank',
            tooltip: false, 
            tooltipTitle: 'CEO Avatar', 
            imgClass: 'image-responsive user-image', 
            imgWidth: size, 
            imgHeight: size  }}
        />  
        </>
    )
}
export default DefaultImage
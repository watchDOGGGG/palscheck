import React from 'react'

const Personalize = ({theme}) => {
    return (
        <div className="flex">
            <div className="w-40 br b--black-10">
                <li className="bb b--black-10 pa2 tj list link f5 pointer fname">change theme</li>
             </div>
            <div className="w-60 bl b--black-10">
               <div className="ml1 tc">Themes</div>
                <div className="flex center">
                    <div className="f5 pointer uwh73rgu bg-black" onClick={e=>theme('dark')}></div>
                    <div className="f5 ml4 pointer uwh73rgu bg-white" onClick={e=>theme('light')}></div>
                </div>
            </div>
        </div>

    )
}
export default Personalize
import React from 'react'
import TalksTrends from '../Trendings/trending'
import Sugesstion from '../Suggestions/suggestions'
import Footer from '../../Footer/footer.jsx'
const Side = ({following,userid}) =>{

    return (
        <div className="trends w-100">
            <div className="mt2">
                <TalksTrends />
            </div>
            <div className="mt2">
                <Sugesstion following={following} loggedIn={userid} />
            </div>
            <div className="mt2">
                <Footer />
            </div>
        </div>
    )
}
export default Side
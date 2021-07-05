import React from 'react'
import { Menu, Dropdown,Skeleton } from 'antd';
import {Link} from 'react-router-dom'
import Logo from '../Logo/logofav3.jsx'
import { DownOutlined,HomeFilled,MessageFilled,BellFilled,MoreOutlined,
    SettingFilled,TeamOutlined,UserOutlined,CreditCardFilled} from '@ant-design/icons';
    
    import { Badge } from 'antd';
const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'

class NavMenu extends React.Component{
    constructor(){
        super()
        this.state={
            size: 'default',
            notifyBadge:''
        }
    }
    componentDidMount(){
        this.getNotificationCount()
     }
    getNotificationCount = async()=>{
        try {
            const fetchData = await fetch(`${SeverLink}/Authentication/Notify/Count`,{
                headers:{token:localStorage.token}
            })
            const response = await fetchData.json()
            if(response.result){
            this.setState({notifyBadge:response.result})
            }
        } catch (error) {
            
        }
    }
    render() {
        const { size, style, notifyBadge } = this.state
        return (
            <div>
                <a href={'https://palscheck.com'}><div className="header-logo flex">
                    <Logo /> <span className="pa1 ml1 b blue fw5 f5">PALSCHECK</span>
                </div>
                </a>
                
                <nav className="ttc tj nav-con">
                    <Link to="/home" className="db f5 fw5 pa3"><span className="nav-icons mr3 f5"><HomeFilled /></span>home</Link>
                    <Link to="/notification" className="db f5 pa3 fw5"><span className="nav-icons mr3 f5"><Badge size="default" count={notifyBadge} overflowCount={999}>
                        <a href="#" className="head-example" />
                    </Badge><BellFilled /></span>notification</Link>
                    <Link to="/talks" className="db f5 pa3 fw5"><span className="nav-icons mr3 f5"><MessageFilled /></span>Talks</Link>
                    {/* <Link to="/fanpage" className="db f5 pa3 fw5"><span className="nav-icons mr3 f5 no-underline"><TeamOutlined /></span>fan page</Link> */}
                    <Link to="/memos" className="db f5 pa3 fw5"><span className="nav-icons mr3 f5 b"># </span>Memos</Link>
                    {
                        this.props.username ?
                            <Link to={`/${this.props.username}.pal`}
                                className="db f5 pa3 fw5"><span className="nav-icons mr3 f5"><UserOutlined /></span>profile</Link>
                            :
                            <Link to={'/home'}
                                className="db f5 pa3 fw5"><span className="nav-icons mr3 f5"><UserOutlined /></span>profile</Link>
                    }

                    <Link className="ant-dropdown-link db f5 pa3 fw5 underline" onClick={e => e.preventDefault()}>
                        <span className="nav-icons mr3 f5 no-underline"><MoreOutlined /></span>see more <DownOutlined />
                    </Link>
                    <hr />
                    <Link to="/settings" className="db f5 pa3 fw5"><span className="nav-icons mr3 f5"><SettingFilled /></span>settings</Link>
                    <Link to="/palscheck/payment" className="db f5 pa3 fw5"><span className="nav-icons mr3 f5 no-underline"><CreditCardFilled /></span>palscheck pay</Link>
                    
                </nav>                
            </div>
        )
    }
}
export default NavMenu
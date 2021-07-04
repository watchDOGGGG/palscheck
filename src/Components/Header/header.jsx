import React from 'react'
import { Avatar,Skeleton } from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import SearchField from './Search/search.jsx'
import '../Layout/layout.css'
import { Link } from 'react-router-dom';
import DefaultImage from '../Dashboard/Defaults/defaultImage'
class Header extends React.Component{
    constructor(){
        super()
        this.state={
            size: 'default'
        }
    }
 //GEt all user additional info

 logout = async()=>{
    try {
        localStorage.removeItem("token")
        this.props.UpdateAuth(2)
    } catch (error) {
        console.log(error.message)
    }
}
    render(){
        const {size} = this.state
        return(
            <header>
                <nav class="dt w-100 border-box pa3 ph5-ns">
                <SearchField/>
                
                <div className="intro">
                {
                    this.props.fullname?
                    <Link class="dtc v-mid f-name link dim w-25 tr f6" to={this.props.username === 'loading'?null:`${this.props.username}.pal`} title="profile">
                <span className="mr3">Hey, {!this.props.fullname?null:`${this.props.fullname}!`}</span>
                
                {
                                    this.props.ProfileImg.length > 0 ?
                                        <Avatar size={40} src={this.props.ProfileImg} />
                                        :
                                        <DefaultImage name={this.props.fullname} size={40} />
                }
                

                </Link>
                    :
                    <span class="dtc v-mid mid-gray link dim w-25 tr f6">
                    ...
                    </span>
                    
                }
                
                <Link onClick={this.logout} class="dtc v-mid f-name link dim w-10 tr f6" to="/login" title="logout"><LogoutOutlined /> logout</Link>
                
                </div>
                </nav>
                
            </header>
        )
    }
}
export default Header
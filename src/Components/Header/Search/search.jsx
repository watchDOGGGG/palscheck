import React from 'react'
import {SearchOutlined} from '@ant-design/icons';
import { Tabs } from 'antd';
import UsersResult from './results/users.jsx'
// import Pageresult from './results/pages.jsx'
const { TabPane } = Tabs;


const SeverLink = 'http://localhost:4000'
class  SearchField extends React.Component{
    constructor(){
        super()
        this.state = {
            Searchinput : '',
            filterBoxstyle:{
                border:"none",
                background:"none"
            },
            filterStyle:{
                width:"300px"
            },
            Users:[],
            pages:[],
            isLoggedIn:[],
            searchVisible:false
        }
    }
    componentDidMount(){
        try {
            this.SearchUsers()
        this.searchPages()
        this.getLoggedInUser()
        } catch (error) {
            
        }
    }
     getLoggedInUser = async()=>{
        const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
            headers:{token:localStorage.token}
        })
        const response = await getLogginUser.json()
        this.setState({isLoggedIn:response.loggedIn})
    }
     SearchUsers = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Authentication/All/user`)
        const res = await fetchAll.json()
        if(res.result){
            this.setState({Users:res.result})
        }
    }

    searchPages = async()=>{
            const GetAllPage = await fetch(`${SeverLink}/Page/`)
            const response = await GetAllPage.json()
            if(response.pages){
               this.setState({pages:response.pages})
            }
        }    

    onSearchchange = (event)=>{
        this.setState({Searchinput:event.target.value})
    }
    closeSearch = ()=>{
        this.setState({searchVisible:false})
    }
    showSearch = () =>{
        this.setState({searchVisible:true})
        this.styleSearchBar()
    }
    styleSearchBar = () =>{
        let searchBar = document.getElementById('searchBar')
        searchBar.style.border = "none";
        searchBar.style.borderRadius = "0px";
        searchBar.style.width = "650px";

    }
    render(){
        const {searchVisible,Searchinput,filterBoxstyle} = this.state
        // search for Users
        const filterSearch = this.state.Users.filter(users=>{
            return users.fullname.toLowerCase().includes(Searchinput.toLowerCase())
        })
        //searchFor pages
        const filterPages = this.state.pages.filter(page=>{
            return page.name.toLowerCase().includes(Searchinput.toLowerCase())
        })
        return(
            <div>
            <div  id="searchBar"  className="header-filter tl br-pill ba center newfeed--3-art" style={this.state.filterStyle}>
                    <span className="f4 pointer"><SearchOutlined /></span>
                    <input id="searchBarinner" value={Searchinput} onFocus={this.showSearch} onChange={e => this.onSearchchange(e)} className="ml2 newfeed--3-art w-90" style={filterBoxstyle} type="text" placeholder={'search palscheck'} />
                </div>
                {
                   searchVisible === true?
                    <div className="newfeed--3-art br2 db center searchbar tc pa2">
                        <div className="tr b f3 pointer"
                        onClick={this.closeSearch}
                        >&times;</div>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="People" key="1">
                            <UsersResult result={filterSearch} isLoggedIn={this.state.isLoggedIn}/>
    </TabPane>
                        {/* <TabPane tab="Pages" key="2">
                            <Pageresult result={filterPages}/>
    </TabPane> */}
                       
                    </Tabs>
                </div>
                    :null
                }
               
            </div>
        )
    }
}
export default SearchField
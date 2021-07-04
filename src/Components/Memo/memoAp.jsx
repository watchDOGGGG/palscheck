import React from 'react'
import MemoCrd from './memoCrd.jsx'

const SeverLink = 'http://localhost:4000'
class PollApp extends React.Component{
  constructor(){
    super()
    this.state = {
      memo:[],
    }
  }
  componentDidMount(){
      this.FetchUserMemo()
  }
   FetchUserMemo = async()=>{
    const fetchmemo = await fetch(`${SeverLink}/Feed/Memo/Memo`,{
      headers:{token:localStorage.token}
    })
    const response = await fetchmemo.json()
   
    if(response.memos){
      this.setState({memo:response.memos})
    }
  }
    render(){
        return(
            <div>
                <MemoCrd memo={this.state.memo} />
        </div>
    )
  }
}
export default PollApp
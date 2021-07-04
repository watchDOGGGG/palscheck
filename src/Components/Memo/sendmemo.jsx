import React from 'react'
import { Modal, Button } from 'antd';
import CommentIcon from '@material-ui/icons/Comment';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SeverLink = 'http://localhost:4000'

class Memo extends React.Component {
  state = {
    loading: false,
    visible: false,
    html: "",
    charLimit: 50,
    load:false
  };
  handleTxtChange = evt => {
    this.setState({ html: evt.target.value });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  Sendpoll = async()=>{
    this.setState({load:true})
      const sendpoll = await fetch(`${SeverLink}/Feed/post/memo`,{
          method:'POST',
          headers:{"Content-Type":"application/json",token:localStorage.token},
          body: JSON.stringify({
              txt:this.state.html,
              to:this.props.userid
          })
      })
      const res = await sendpoll.json()
      if(res.success){
          this.setState({loading:false,visible:false,load:false})
      }
  }
  render() {
    const { visible,load} = this.state;
    return (
      <>
      <span className=" f6 pointer f-name" onClick={this.showModal}>
        <CommentIcon />
        </span>
        <Modal
          visible={visible}
          title={`send Memo to ${this.props.username}`}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
              this.state.html.length>2?
            <Button key="send" className="w-50 bg-blue" onClick={this.Sendpoll}>
              send {load === true? <Spin indicator={antIcon} />:null}
            </Button>
            :
            <Button key="send" className="w-50 bg-blue" disabled>
            send
          </Button>
          ]}
          style={{color:'inherit'}}
        >
           <input
          onChange={this.handleTxtChange}
          value={this.state.html}
          type="text" maxLength="50" className="w-100 f4 h3 pa2" spellCheck={true}
          onChange={this.handleTxtChange}
          placeholder="write Memo here......"
          id="l557r_textarea"
          />
          <div className="f-name">Remaining Characters: {this.state.charLimit - this.state.html.length}</div>
        </Modal>
      </>
    );
  }
}

export default Memo
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
    <a class="flex f6 fw1" onClick={() => setVisible(true)}><ReportOutlinedIcon/><span className="ml2">Report content of this post</span></a>
      
      <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={500}
      >
        Report content
      </Modal>
    </>
  );
};

export default App
import { Card } from '@material-ui/core'
import React from 'react'
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

const Form1 = ({SetName,name})=>{

    return(
        <div>
            
                <h1 className="ttu f6">Choose a name for your company</h1>
                <span>choosing a good name for your company helps users to reach out to you quickly</span>
                <div class='w-50 center mt5'>
                    <Card>
                        <Input
                        value={name}
                        onChange={e=>SetName(e)}
                            placeholder="Enter your company name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Card>
                </div>
            
        </div>
    )
}
export default Form1
import { Card } from '@material-ui/core'
import React from 'react'
import { Select,Input } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const Form4 = ({time,SetTime})=>{

    return(
        <div>
            
                <h1 className="ttu f6">available period</h1>
                <span>let people know what time your company or brand is available</span>
                <div class='center w-60 center mt5'>
                <Card>
                    <Select
                   value={time}
                    onChange={e=>SetTime(e)} 
                        showSearch
                        style={{ width: 360 }}
                        placeholder="Time available"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="only morning">only morning</Option>
                        <Option value="only afternoon">only afternoon</Option>
                        <Option value="only night">only night</Option>
                        <Option value="always available">always available</Option>
                    </Select>
                    </Card>
                    
                    
            </div>

        </div>
    )
}
export default Form4
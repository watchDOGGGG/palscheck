import { Card } from '@material-ui/core'
import React from 'react'
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
const Form3 = ({SetCountry,SetRegion,region,country,address1,address2,SetAddress1,SetAddress2})=>{

    return(
        <div>
            
                <h1 className="ttu f6">Location and services</h1>
                <span>We need a few info on where you company is located at</span>
                <div class='w-50 mt3'>
                    <div class='mt3 pa2'>
                    <Card>
                    <CountryDropdown
                        value={country}
                        onChange={e=>SetCountry(e)} />
                    </Card>
                    
                    </div>
                    <div class='mt3 pa2 w-50'>
                        <Card>
                    <RegionDropdown
                                    country={country}
                                    value={region}
                                    onChange={e=>SetRegion(e)} /> 
                    </Card>
                    </div>
                    
                    <div className="grid flex">
                    <div class='mt3 pa2'>
                        <Card>
                        <Input
                        value={address1}
                        onChange={e=>SetAddress1(e)}
                            placeholder="Address 1"
                            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Enter the current location of your company">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Card>
                    </div>
                    
                    <div class='mt3 pa2'>
                       <Card>
                        <Input
                        value={address2}
                        onChange={e=>SetAddress2(e)}
                            placeholder="Address 2"
                            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                            suffix={
                                <Tooltip title="Enter any park, bus station, or any residential area close to your comapny">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                    </Card> 
                    </div>
                    
                    </div>

                </div>
            
        </div>
    )
}
export default Form3
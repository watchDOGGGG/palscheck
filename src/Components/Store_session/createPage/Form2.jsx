import { Card } from '@material-ui/core'
import React from 'react'
import { Select,Input } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const Form2 = ({about,desc,SetDesc,SetAbout})=>{

    return(
        <div>
            
                <h1 className="ttu f6">About your company/brand</h1>
                <span>Details about your company description</span>
                <div class='center w-60 center mt5'>
                <Card>
                    <Select
                   value={desc}
                    onChange={e=>SetDesc(e)} 
                        showSearch
                        style={{ width: 360 }}
                        placeholder="Decribe your company or brand"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="App">App</Option>
                        <Option value="Appliance">Appliance</Option>
                        <Option value="Baby Goods/Kids Goods">Baby Goods/Kids Goods</Option>
                        <Option value="Cars">Cars</Option>
                        <Option value="Clothing">Clothing</Option>
                        <Option value="Electronics">Electronics</Option>
                        <Option value="Food/Beverages">Food/Beverages</Option>
                        <Option value="Furniture">Furniture</Option>
                        <Option value="Games/Toys">Games/Toys</Option>
                        <Option value="Advertising">Advertising</Option>
                        <Option value="Health/Beauty">Health/Beauty</Option>
                        <Option value="Jewelry/Watches">Jewelry/Watches</Option>
                        <Option value="Kitchen/Cooking">Kitchen/Cooking</Option>
                        <Option value="Pet Supplies">Pet Supplies</Option>
                        <Option value="Fashion">Fashion</Option>
                        <Option value="Music">Music</Option>
                        <Option value="Media/News/Publishing">Media/News/Publishing</Option>
                        <Option value="Travel/Leisure">Travel/Leisure</Option>
                        <Option value="Book Store">Book Store</Option>
                        <Option value="Movie Theatre">Movie Theatre</Option>
                        <Option value="Museum/Art Gallery">Museum/Art Gallery</Option>
                        <Option value="Restaurant / Cafe">Restaurant / Cafe</Option>
                        <Option value="Shopping / Retail">Shopping / Retail</Option>
                        <Option value="Concert Venue">Concert Venue</Option>
                        <Option value="Sport">Sport</Option>
                        <Option value="TV Channel">TV Channel</Option>
                        <Option value="Others">Others</Option>
                    </Select>
                    </Card>
                    
                    <div  class='mt5'>
                    <span >Tell us A little about your company/brand</span>
                    <Card>
                    <TextArea
                    value={about}
                    onChange={e=>SetAbout(e)} 
                    rows={4} placeholder="Tell us about your comapany"/>
                    </Card>
                    </div>
                    
            </div>

        </div>
    )
}
export default Form2
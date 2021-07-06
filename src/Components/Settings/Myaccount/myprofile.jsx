import {
    CameraOutlined,
    SettingOutlined,FlagOutlined,GlobalOutlined,UserOutlined
} from '@ant-design/icons'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { TextareaAutosize } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Spin } from 'antd';
import { LoadingOutlined,CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const MyProfilebio = ({myData}) => {
    const [country, setCountry] = React.useState('')
    const [names, setNames] = React.useState(myData.fullname)
    const [Username, setUserName] = React.useState(myData.username)
    const [bio, setUserbio] = React.useState('')
    const [region, setRegion] = React.useState('')
    const [address, setUserAddress] = React.useState('')
    const [CoverPicture, setPicture] = React.useState(null);
    const [eventCover, setImgData] = React.useState([]);
    const [ProfilePicture, setPicture1] = React.useState(null);
    const [eventProfile, setImgData1] = React.useState([]);
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState(0)
    const [status, setStatus] = React.useState('')
    const [load,setload] = React.useState(false)
    const [Imgload,setImgload] = React.useState(false)

    //changing profile cover art
    const onChangePictureCover = e => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    //changing profile profile art
    const onChangePictureProfile = e => {
        if (e.target.files[0]) {
            setPicture1(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData1(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    //set Country
    const SetcountryField = (e) => {
        setCountry(e)
    }
    //set Region
    const SetregionField = (e) => {
        setRegion(e)
    }

    //onFinish
    const onFinish = async () => {
        setload(true)
        const formData = new FormData()
        formData.set('names', names)
        formData.set('country', country)
        formData.set('region', region)
        formData.set('bio', bio)
        formData.set('username', Username)
        formData.set('address', address)
        formData.set('status', status)
        
        const UpdateData = await fetch(`${SeverLink}/Patch/myProfileBio`, {
            method: 'PATCH',
            headers: { token: localStorage.token },
            body: formData
        })

        const response = await UpdateData.json()
        setload(false)
        if (response.error) {
            setError(response.error)
            setSuccess(0)
            setPicture1([])
        } else {           
            setSuccess(1)
            setError('')
        }
    }

    const setProfileIMg = async()=>{
        setImgload(true)
        const formData = new FormData()
        formData.append('files', ProfilePicture);
        axios.patch(`${SeverLink}/Patch/myProfileImg`, formData,{
            headers:{token:localStorage.token} 
        }).then(response => {
          if (response.error) {
            setError(response.error)
            setSuccess(0)
            setImgload(false)
        } else {
            setSuccess(response.data)
            setError('')
            setImgload(false)
        }
        })
  
    }
    const setCoverIMg = async()=>{
        setImgload(true)
        const formData = new FormData()
        formData.append('files', CoverPicture);
        axios.patch(`${SeverLink}/Patch/myCoverImg`, formData,{
            headers:{token:localStorage.token} 
        }).then(response => {
          if (response.error) {
            setError(response.error)
            setSuccess(0)
            setImgload(false)
        } else {
            setSuccess(response.data)
            setError('')
            setPicture([])
            setImgload(false)
        }
        })
    }

    const clearCoverImg = ()=>{
        setPicture(null);
        setImgData([])
    
    }
    const clearProfileIMg = ()=>{
        setPicture1(null);
        setImgData1([])
    }
    return (
        <div>
            <div className="ml1 dib f4 ttc tc fw6 b">my profile</div>
            <div className="ml1 dib f4 ttc tc fw6 tr ml5 b"><SettingOutlined /> General</div>

            <div className="edit_profile">
                {/* profile image and cover */}
                <div className="edit_profile_img">
                    <div className="w-100 pa2 ph2 br3 center edit_cover_img ba b--blue">
                        <div className="editinnerCoverImage">
                            <img src={
                                eventCover
                                } alt="" />
                        </div>
                        <label className="f3 pointer">
                            <input type="file" style={{ display: 'none' }} onChange={onChangePictureCover} />
                            <CameraOutlined />
                        </label>
                        {
                            eventCover.length >0 ?
                                <div>
                                    {
                                        success === 1 ?
                                            <code className="tl f3 green fw1 pointer flex"><CheckCircleOutlineIcon /><span className="f6 ml1"><CheckCircleOutlined />saved</span></code>
                                            :
                                            <code className="tl f3 blue fw1 pointer flex" onClick={setCoverIMg}><span className="f6 ml1">{load === true?<Spin/>:<span>Update</span>}</span></code>
                                    }
                                    
                                    <code className="tr f3 blue absolute pcc pointer" onClick={clearCoverImg}><CancelIcon/></code>
                                </div>
                                : null
                        }
                    </div>
                    <div className="w-50 pa2 ph2 br3 center edit_profile_img ba b--blue relative">
                        <div className="editinnerProfileImage">
                            <img src={
                                eventProfile
                                } alt="" />
                        </div>
                        <label className="f3 pointer">
                            <input type="file" style={{ display: 'none' }} onChange={onChangePictureProfile} />
                            <CameraOutlined />                            
                        </label>

                        {
                            eventProfile.length>0?
                                <div>
                                    {
                                        success === 1 ?
                                            <code className="tl f3 green fw1 pointer flex"><span className="f6 ml1"><CheckCircleOutlined />saved</span></code>
                                            :
                                            <code className="tl f3 blue fw1 pointer flex" onClick={setProfileIMg}><CheckCircleOutlineIcon /><span className="f6 ml1">{load === true?<Spin/>:<span>Update</span>}</span></code>
                                    }
                                   
                                    <code className="tr f3 blue fw1 absolute ppc pointer" onClick={clearProfileIMg}><CancelIcon/></code>
                                </div>
                                : null
                        }
                    </div>
                </div>
                <hr/>
                {/* profile data */}
                <div className="pals_edit_data pa2 ">
                    {/* names */}
                    <div className="b">Edit profile names</div>
                    <div className="pa2 mt1">
                        <input value={names} onChange={e => setNames(e.target.value)} id="outlined-basic" label="names" variant="outlined" className="pa1 ttc f6 w-70 newfeed--3-art fname" />
                    </div>
                    {/* username */}
                    <div className="pa2 mt1">
                        <input onChange={e => setUserName(e.target.value)} value={Username} id="outlined-basic" label="username" variant="outlined" className="pa1 ttc f6 w-70 newfeed--3-art fname" />
                        <span className="f-name2 f6 dim sm db"><UserOutlined/> your username is {myData.username}</span>
                    </div>
                    <hr/>
                    {/* bio */}
                    <div className="mt3 b">Edit profile bio</div>
                    <div className="pa2 mt1">
                        <TextareaAutosize rowsMax={80}
                            onChange={e => setUserbio(e.target.value)} 
                            aria-label="maximum height"
                            placeholder="Bio"
                            defaultValue={myData.about}
                            className="pa1 f6 w-70 br3 ba b--blue fname newfeed--3-art" />
                    </div>
                    {/* status */}
                    <div className="mt3 b">Update status</div>
                    <div className="pa2 mt1">
                        <TextareaAutosize rowsMax={80}
                            onChange={e => setStatus(e.target.value)} 
                            aria-label="maximum height"
                            placeholder="Staus"
                            defaultValue={myData.status}
                            className="pa1 f6 w-70 br3 ba b--blue fname newfeed--3-art" />
                    </div>
                    <hr/>
                    {/* location */}
                    {/* country */}
                    <div className="location_user mt3">
                        <div>Location</div>
                        <span className="db">country: <CountryDropdown style={{ border: "1px solid #357edd", padding: "10px" }} value={country} onChange={e => SetcountryField(e)} className="newfeed--3-art"/></span>
                        <span className="gray f6 dim sm db"><FlagOutlined/> your current country is {myData.country}</span>
                        <span className="db mt2 pa3">state: <RegionDropdown
                            country={country}
                            value={region}
                            onChange={e => SetregionField(e)}
                            style={{ border: "1px solid #357edd", padding: "10px" }}
                            className="newfeed--3-art"
                        />
                        </span>
                        <span className="gray f6 dim sm db"><GlobalOutlined/> your current region is {myData.region}</span>
                        <div className="pa2 mt1">
                            Address: <input onChange={e => setUserAddress(e.target.value)} value={myData.address} id="outlined-basic" label="address" variant="outlined" className="pa1 ttc f6 w-70 newfeed--3-art" />
                            <span className="gray f6 dim sm db"><GlobalOutlined/> your current address is {myData.address}</span>
                        </div>
                    </div>
                </div>
                <span className="red">{error}</span>
                {
                    success === 1 ?
                    <a class="ml4 mt1 f5 link br-pill bg-light-blue ph3 pv2 dib fw6 white dib tc" onClick={onFinish}><CheckCircleOutlined />saved</a>
                        :
                        <a class="ml4 mt1 f5 link br-pill bg-light-blue ph3 pv2 dib fw6 white dib tc" onClick={onFinish}>{load === true?<Spin/>:<span>Update</span>}</a>
                }

            </div>
        </div>

    )
}
export default MyProfilebio
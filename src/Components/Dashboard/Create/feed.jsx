import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {Image} from 'antd'
import { CloseCircleOutlined,CameraOutlined,GifOutlined,SmileOutlined,CaretDownOutlined,VideoCameraAddOutlined} from '@ant-design/icons';
import ContactlessIcon from '@material-ui/icons/Contactless';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import GifPicker from 'react-twitter-gifpicker';
import ContentEditable from 'react-contenteditable'
import { Popover, Button,Alert} from 'antd';
import PublicIcon from '@material-ui/icons/Public';
import { Player, ControlBar,} from 'video-react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const UploadTestComponent = ({ProfileImg,fullname}) => {
    const classes = useStyles();
    const [image, setimage] = React.useState([])
    const [UploadFiles,setUploadFiles] = React.useState([])

    const [gifimg, setgif] = React.useState([])

    const [videos, setVideos] = React.useState([])   

    const [open, setOpen] = React.useState(false);
    
    const [emojiVisbility, setemojiVisibility] = React.useState(false)
    const [innerTxt, setInnerTxt] = React.useState('')
    const [postFor,setPostFor] = React.useState('followers')
    const [error,setError] = React.useState('')
    const [success,setSuccess] = React.useState('')
    const [load,setload] = React.useState(false)

    const previewFiles = (event)=> {
        setload(false)
        var preview = document.querySelector('#preview');

        if (event) {
            [].forEach.call(event.target.files, readAndPreview);
        }

        function readAndPreview(file) {
            var reader = new FileReader();
            var video = document.createElement('video')
            // Make sure `file.name` matches our extensions criteria
            // Make sure `file.name` matches our extensions criteria
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                setUploadFiles(UploadFiles=>[...UploadFiles, event.target.files[0]])
                setgif([])
                reader.addEventListener("load", function () {
                    setimage(image=>[this.result, ...image])
                    
                });

                reader.readAsDataURL(file);

            } 
            else if (/\.(mp4|mkv)$/i.test(file.name)) {
                setUploadFiles(UploadFiles=>[...UploadFiles, event.target.files[0]])
                setgif([])
                reader.addEventListener("load", function () {
                    video.title = file.name;
                    video.src = this.result
                    setVideos(videos => [this.result, ...videos])
                })
                
                reader.readAsDataURL(file);
            }
            else {
                return alert(file.name + " this file type cant be uploaded");
            } // else...
        }
    }
    

   
    const removeImage = (name) => {
        setimage(image.filter(item => item !== name));
    };

    const removeVideo = (name) => {
        setVideos(videos.filter(item => item !== name));
    };

    const removeGif = (name) => {
        setgif(gifimg.filter(item => item !== name));
    }

// Gif configuration
    const onPickGif = (gif, e) => {
        setgif(gifimg => [gif.embed_url, ...gifimg])
        setOpen(false)
    }

    


    //Emoji configuration
    const toggleEmojiV = () => {
        emojiVisbility === false ?
            setemojiVisibility(true)
            : setemojiVisibility(false)
    }
    const seTemoji = (emoji) => {
        setInnerTxt(innerTxt + emoji.native)

    }
    const handleChange = evt => {
        setInnerTxt(evt.target.value);
    };

    
    const onFinish = async() =>{
        setload(true) 
        var formData = new FormData();
        formData.set('txt',innerTxt)
        formData.set('Feedtype','feed')
        formData.set('gif',gifimg)
        formData.set('post_for',postFor)
        
        for (let i = 0; i < UploadFiles.length; i++) {
            formData.append('files', UploadFiles[i]);
           
        } 
        axios.post(`${SeverLink}/Feed/`, formData,{
            headers:{token:localStorage.token} 
        }).then(res => {
           if(res.data){
            setSuccess('success uploading feed')
            setError('')
            setUploadFiles([])
            setimage([])
            setgif([])
            setVideos([])
            setload(false)
        }else if(res.error){
            setError(res.error)
            setSuccess('')
            setload(false)
        }
        })
    }


// who can see your post
const content = (
    <div className="f5 fw6 blue">
        <h3 className="w-80 tc fw6 b blue">choose where your post should be seen, by defult only users following you can see this.</h3>
      <p  className="flex blue pa2 ph1 hover-bg-lightest-blue w-30 br-pill pointer" onClick={e=>setPostFor('paywall')}><ContactlessIcon/>Paywall</p>
      <p className="flex blue pa2 ph1 hover-bg-lightest-blue w-30 br-pill pointer" onClick={e=>setPostFor('public')}><PublicIcon/>Public</p>
      <p className="flex blue pa2 ph1 hover-bg-lightest-blue w-30 br-pill pointer" onClick={e=>setPostFor('followers')}><SupervisedUserCircleIcon/>Followers</p>
    </div>
  );
    return (
        <div className="w-100 center">
            <div className="w-100">
                {/* user profile details */}
                <div className="pa2 ph2 fw5 pa3 f4 ml3 mb3 f-name2">Let's your pals know what's happing</div>

                <div className={classes.root}>
                    <div className="Pas3lserInfo" >
                        <Avatar alt={fullname} src={ProfileImg}/>
                    </div>
                    <div className="Pas3ls_content w-100">
                        {/* <div onInput={e=>OnchangeTxt(e)} className="w-100 Pas3ls_2ontent f3 gray pa2 ph2" contenteditable="true" placeholder="Enter text here...">{innerTxt}</div> */}
                        <ContentEditable html={innerTxt} className="w-100 Pas3ls_2ontent f3 gray pa2 ph2 fw5" onChange={handleChange} placeholder="Spit it out..." />
                    
                    </div>
                </div>

                <div className=" bt b--black-10 ">
                    {/* pick where your post should be seen */}
                        <div className="flex blue">
                        <Popover content={content} trigger="click" placement="bottom">
                            <div className="flex blue items-center ml5 pa1 pointer hover-bg-lightest-blue w-auto mt2 br-pill">
                                <PublicIcon />who should see this? <span className="ml5"><CaretDownOutlined />{postFor}</span>
                    </div>
                        </Popover>
                        </div>
                    <div className="flex items-center ml5 mt3">
                        <dd class="pa2 ph2 hover-bg-lightest-blue pointer w-auto br-pill flex f3 fw6 blue">

                            <SmileOutlined onClick={toggleEmojiV} />
                            {
                                emojiVisbility === true ?
                                    <Picker
                                        onSelect={seTemoji}
                                        theme="dark"
                                        set='google'
                                        style={{ position: 'absolute', left: '20px', zIndex: 99, marginTop: '39px' }}
                                        title='Pick your emoji…'
                                        emoji='point_up' i18n={{ search: 'search...', categories: { search: 'search emojis', recent: 'Recent' } }}
                                        size={34}
                                    />
                                    : null
                            }

                        </dd>
                        
                            {
                                gifimg.length > 0 || image.length > 0 ?
                                <dd class="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 lightest-blue ml4">
                                    <GifOutlined disabled />
                                    </dd>
                                    :
                                    <dd class="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 blue ml4">
                                    <GifOutlined onClick={() => setOpen(true)} />
                                    </dd>
                            }
                            <GifPicker
                                api_key={'RBvYzkvEcXd3wJ9E232z4GX8mrEWlgml'}
                                borderRadius={10}
                                columns={4}
                                open={open}
                                onClose={() => setOpen(false)}
                                onGifClick={onPickGif}
                                onPickClose={false}
                            />
                        
                        {
                            gifimg.length > 0 || image.length > 6?
                                <dd class="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 blue ml4">
                                    <label className="pa2 ph2 hover-bg-light-pink pointer w-auto br-pill flex f3 fw6 lightest-blue">
                                    <input id="file-input" type="file" style={{ display: 'none' }} disabled />
                                    <AddAPhotoIcon />
                                </label>
                                </dd>
                                :
                                <>
                                <dd class="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 blue ml4">
                                <label className="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 blue">
                                    <input onChange={e=>previewFiles(e)} id="file-input" type="file" style={{ display: 'none' }} />
                                    <AddAPhotoIcon />
                                </label>
                                </dd>
                                </>

                        }
                        
                        <div className="w-auto pa3  self-start ml5">
                            {
                                videos.length > 0 || gifimg.length > 0 || image.length > 0 || innerTxt.length > 2 ?
                                <a class="f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib navy w-auto" onClick={onFinish}>Upload{load === true? <Spin indicator={antIcon} />:null}</a>
                                :null
                            }
                        
                        </div>
                    </div>
                </div>
                <div className="db f6">
                            {
                                error.length > 0 ?
                                    <Alert
                                        message="error"
                                        description={`${error}`}
                                        type="error"
                                        showIcon
                                    />
                                    : success.length > 0 ?
                                        <Alert
                                            message="success"
                                            description={`${success}`}
                                            type="success"
                                            showIcon
                                        />
                                        : null
                            }
                        </div>
                <div>
                    <div id="preview">
                        {
                            gifimg.length > 0 ?
                                gifimg.map((gif) => {
                                    return (
                                        <div className="w-100 dib pa3 ba b--white-10 br3">
                                         <span className="pointer f3 blue" onClick={e => removeGif(gif)}><CloseCircleOutlined /></span>
                                            <iframe src={gif} frameBorder="0" width={500} class="giphy-embed"></iframe>
                                           
                                        </div>
                                    )
                                })

                                : null
                        }
                      
                            {
                                image.length > 0 ?
                                    image.map((srcs, i) => {
                                        return (
                                            <div className="w-50 dib pa3 ba b--white-10 br3" style={{height:"250px",overflow:"hidden"}}>
                                                    <span className="pointer f3 blue" onClick={e => removeImage(srcs)}><CloseCircleOutlined /></span>
                                                    <Image src={srcs} />
                                                  
                                            </div>
                                        )
                                    })
                                    :
                                    null
                            }
                        {
                            videos.length > 0 ?
                            videos.map((srcs, i) => {
                                return (
                                        <div class="w-50 dib pa3 ba b--white-10 br3" style={{height:"250px",overflow:"hidden"}}>
                                            <span className="pointer f3 blue" onClick={e => removeVideo(srcs)}><CloseCircleOutlined /></span>
                                                    <Player
                                                        src={srcs}
                                                    >
                                                        <ControlBar autoHide={false} disableDefaultControls={true}>
                                                        </ControlBar>
                                                    </Player>
                                                </div>
                                )
                                })
                                :
                                null
                        }
                    </div>
                </div>
                {/* feed info */}
                {/* feed text */}
                {/* feed emojis */}
                {/* feed image videos add */}
                {/* feed image video preview */}
            </div>

        </div>
    )
}
export default UploadTestComponent
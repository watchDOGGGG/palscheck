import React, { useEffect, useState } from 'react';
import { Modal} from 'antd';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Image} from 'antd'
import { CloseCircleOutlined,CameraOutlined,GifOutlined,SmileOutlined,CaretDownOutlined} from '@ant-design/icons';
import ContactlessIcon from '@material-ui/icons/Contactless';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import GifPicker from 'react-twitter-gifpicker';
import ContentEditable from 'react-contenteditable'
import { Popover, Button,Alert} from 'antd';
import PublicIcon from '@material-ui/icons/Public';
import { ImageAspectRatio } from '@material-ui/icons';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const App = ({feedTxt,feedMedia,UserDetails,address}) => {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
    const [image, setimage] = React.useState([])
    const [feedImg,setFeedimg] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [gifimg, setgif] = React.useState([])
    const [emojiVisbility, setemojiVisibility] = React.useState(false)
    const [innerTxt, setInnerTxt] = React.useState(feedTxt)
    const [postFor,setPostFor] = React.useState('followers')
    const [error,setError] = React.useState('')
    const [success,setSuccess] = React.useState('')
    const [load,setload] = React.useState(false)

    // image and video configuration
    const previewImages = (event)=> {

        var preview = document.querySelector('#preview');

        if (event.target.files) {
            [].forEach.call(event.target.files, readAndPreview);
            setFeedimg(feedImg => [event.target.files, ...feedImg])
        }
        

        function readAndPreview(file) {
            var reader = new FileReader();
            var video = document.createElement('video')
            video.setAttribute("id", `pals_feedvid`)

            function togglePlay() {
                var myVideo = document.getElementById(`pals_feedvid`);
                return myVideo.paused ? myVideo.play() : myVideo.pause();
            };
            video.addEventListener('click', () => {
                togglePlay()
            })

            // Make sure `file.name` matches our extensions criteria
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {

                reader.addEventListener("load", function () {

                    setimage(image => [this.result, ...image])
                });

                reader.readAsDataURL(file);


            } else if (/\.(mp4|mkv)$/i.test(file.name)) {

                reader.addEventListener("load", function () {
                    video.height = 100;
                    video.title = file.name;
                    video.src = this.result
                    preview.appendChild(video);
                })
                reader.readAsDataURL(file);
            } else {
                return alert(file.name + " is not a gallery file");
            } // else...
        }
    }
    

   
    const removeImage = (name) => {
        setimage(image.filter(item => item !== name));
        setFeedimg(feedImg.filter(item => item !== name));
    };



// Gif configuration
    const onPickGif = (gif, e) => {
        setgif(gifimg => [gif.embed_url, ...gifimg])
        setOpen(false)
    }

    const removeGif = (name) => {
        setgif(gifimg.filter(item => item !== name));
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
        const formData = new FormData();
        formData.set('txt',innerTxt)
        formData.set('Feedtype','feed')
        formData.set('feed_id',address)
        formData.set('gif',gifimg)
        formData.set('post_for',postFor)
        feedImg.forEach((element,i) => {
            formData.append('files', element[i]);
        });
        const UploadFeed = await fetch('http://localhost:4000/Patch/Feed/Content',{
            method:'PATCH',
            headers:{token:localStorage.token},
            body:formData,
        })
        const res = await UploadFeed.json()
        if(res.data){
            setSuccess('success updating feed')
            setError('')
            setload(false)
        }else if(res.error){
            setError(res.error)
            setSuccess('')
            setload(false)
        }
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
    <>
    <div class="flex f6 fw1" onClick={() => setVisible(true)}><EditOutlinedIcon/><span className="ml2">Edit content of this post</span></div>
      
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        footer={[]}
        onCancel={() => setVisible(false)}
        width={500}
      >
         <div className="w-100 center">
            <div className="w-100 f-name">
                {/* user profile details */}
                <div className="pa2 ph2 fw5 pa3 f4 ml3 mb3 f-name2">Edit content of this post</div>

                <div className={classes.root}>
                    <div className="Pas3ls_content w-100">
                        {/* <div onInput={e=>OnchangeTxt(e)} className="w-100 Pas3ls_2ontent f3 gray pa2 ph2" contenteditable="true" placeholder="Enter text here...">{innerTxt}</div> */}
                        <ContentEditable html={innerTxt} className="w-100 Pas3ls_2ontent f3 gray pa2 ph2 fw5" onChange={handleChange} placeholder="Enter text here..." />
                    
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
                                <dd class="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 lightest-blue">
                                    <GifOutlined disabled />
                                    </dd>
                                    :
                                    <dd class="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 blue">
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
                                <dd>
                                    <label className="pa2 ph2 hover-bg-light-pink pointer w-auto br-pill flex f3 fw6 lightest-blue">
                                    <input id="file-input" type="file" multiple style={{ display: 'none' }} disabled />
                                    <CameraOutlined />
                                </label>
                                </dd>
                                :
                                <dd>
                                <label className="pa2 ph2 hover-bg-light-green pointer w-auto br-pill flex f3 fw6 blue">
                                    <input onChange={e=>previewImages(e)} id="file-input" type="file" multiple style={{ display: 'none' }} />
                                    <CameraOutlined />
                                </label>
                                </dd>

                        }
                        
                        <div className="w-25 pa3 ml2 self-start">
                            {
                                gifimg.length > 0 || image.length > 0 || innerTxt.length > 2 ?
                                <a class="ml4 mt1 f5 link br-pill bg-light-blue ph3 pv2 dib fw6 white dib tc" onClick={onFinish}>upload {load === true? <Spin indicator={antIcon} />:null}</a>:null
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
                                        <>
                                            <iframe src={gif} frameBorder="0" class="giphy-embed"></iframe>
                                            <span className="pointer f3 blue" onClick={e => removeGif(gif)}><CloseCircleOutlined /></span>
                                        </>
                                    )
                                })

                                : null
                        }

                        {
                            image.length > 0 ?
                                image.map((srcs, i) => {
                                    return (
                                        <section className="preview_div">
                                            <span className="pointer f3 blue" onClick={e => removeImage(srcs)}><CloseCircleOutlined /></span>
                                            <Image src={srcs} />
                                        </section>
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
      </Modal>
    </>
  );
};

export default App
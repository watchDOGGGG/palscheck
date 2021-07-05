
import React from 'react'
import { Image } from 'antd';


const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'
class Gallery extends React.Component{
    constructor(){
        super()
        this.state = {
            Imggallery:[]
        }
    
    }
    componentDidMount(){
        this.getGallery()
    }
    componentDidUpdate(){
        // this.renderImg()
    }
    renderImg = () => {
        const buttons = document.querySelectorAll('.project');
        const overlay = document.querySelector('.overlay');
        const overlayImage = document.querySelector('.overlay__inner img');

        function open(e) {
            overlay.classList.add('open');
            const src = e.currentTarget.querySelector('img').src;
            overlayImage.src = src;
        }

        function close() {
            overlay.classList.remove('open');
        }

        buttons.forEach(button => button.addEventListener('click', open));
        overlay.addEventListener('click', close);
    }


  
    //fetch All user images to gallery
    getGallery = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Feed/GalleryImg/${this.props.id}`,)
        const response = await fetchAll.json()
        
        if(response.gallery){
            this.setState({Imggallery:response.gallery})
        }
    }

    
    render(){
        const {Imggallery} = this.state
        
        return(
            <>

    <div className="ttc f2 b">{this.props.fullname} photos</div>
    
  <section id="portfolio" className="">
  <main class="cf pa2">

      {
          this.state.Imggallery.length > 0?
          this.state.Imggallery.map((imgs,i)=>{
              return (
                  <>
                  {
                      imgs.feedMedia_type === "image/jpeg" ||imgs.feedMedia_type === "image/jpg" || imgs.feedMedia_type === "image/png"? 
                  <>
                   <div class="project fl w-100 w-50-ns ph2">
                          <div  class="pv2 grow db no-underline black">
                          <div class="project__image db w-100 br3" style={{overflow:"hidden"}}>
                              <Image src={imgs.url} />
                          </div>
                          </div>
                      </div>

                      <div class="overlay3l">
                          <div class="overlay__inner">
                              <button class="close">close X</button>
                              <img />
                          </div>
                      </div>
                  </>
                     :null
                      }
                  </>
              )
          })
                                : <p>No photos!</p>
                        }
</main>
  </section>
            </>
        )
    }
}
export default Gallery

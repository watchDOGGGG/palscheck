import React from 'react'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { Player, ControlBar,} from 'video-react';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
class Slider extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        currentIndex: 0,
        translateValue: 0
      }
    }
  
    goToPrevSlide = () => {
      if(this.state.currentIndex === 0)
        return;
      
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1,
        translateValue: prevState.translateValue + this.slideWidth()
      }))
    }
  
    goToNextSlide = () => {
      // Exiting the method early if we are at the end of the images array.
      // We also want to reset currentIndex and translateValue, so we return
      // to the first image in the array.
      if(this.state.currentIndex === this.props.images.length - 1) {
        return this.setState({
          currentIndex: 0,
          translateValue: 0
        })
      }
      
      // This will not run if we met the if condition above
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        translateValue: prevState.translateValue + -(this.slideWidth())
      }));
    }
  
    slideWidth = () => {
       return document.querySelector('.slide').clientWidth
    }
  
    render() {
      const {images} = this.props
      return (
        <div className="slider">
  
          <div className="slider-wrapper"
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: 'transform ease-out 0.45s'
            }}>
              {
                images.length > 1 ?
                images.map((image, i) => (
                  <>
                  <Slide key={i} image={image.url} type={image.type} contentStyle={this.props.contentStyle}/>
                  </>
                ))
                : images.length < 2 && images.length > 0 ?
                images[0].type === "img" ?
                    <div class="dib slide-full">
                      <div class="ratio-3by3"><img className="br3" src={images[0].url} /></div>
                    </div>
                    :
                    <div class="dib slide-full">
                      <div class="ratio-3by3" style={this.props.contentStyle}>
                        <Player
                          poster={images[0].url}
                          src={images[0].url}
                        >
                          <ControlBar autoHide={false} disableDefaultControls={true}>
                          </ControlBar>
                        </Player>
                      </div>
                    </div>
                  : null
              }
              
          </div>

          {
            images.length > 1 ?
              <>
                <LeftArrow
                  goToPrevSlide={this.goToPrevSlide}
                />

                <RightArrow
                  goToNextSlide={this.goToNextSlide} />
              </>

              : null
              }
              <Vs />
        </div>
      );
    }
  }
  
  export default Slider

  const Slide = ({ image,type,contentStyle }) => {
    return (
     <>
     {
          type === "img" ?
            <div class="dib slide">
              <div class="ratio-4by3">
                  <img className="br3" src={image} />
                </div>
            </div>
            :
            <div class="dib slide">
              <div class="ratio-3by3" style={contentStyle}>
                <Player
                poster={image}
                src={image}
              >
                <ControlBar autoHide={false} disableDefaultControls={true}>
                </ControlBar>
              </Player>
              </div>
              </div>
        }

     </>
      )
  }
  
  
  const LeftArrow = (props) => {
    return (
      <div className="backArrow arrow black" onClick={props.goToPrevSlide}>
        <ArrowLeftIcon/>
      </div>
    );
  }
  
  
  const RightArrow = (props) => {
    return (
      <div className="nextArrow arrow black" onClick={props.goToNextSlide}>
        <ArrowRightIcon/>
      </div>
    );
  }
  const Vs = () =>{
    return (
      <div className="absolute center tc f4 b vs blue">
        OR
      </div>
    );
  }
 
 
              
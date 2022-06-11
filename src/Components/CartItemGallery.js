import { Component } from 'react'

export default class CartItemGallery extends Component{
    constructor(props){
        super(props);
        this.handleGalleryNav = this.handleGalleryNav.bind(this)
        this.state = {
            currentImage: 0
        }
    }

    handleGalleryNav(event){
        if(event.currentTarget.innerText === '>'){
            this.setState((prevState)=>{
                if(prevState.currentImage === this.props.gallery.length-1){
                    return{
                        currentImage: 0
                    }
                }else{
                    return{
                        currentImage: prevState.currentImage+1
                    }
                }
            })
        }else{
            this.setState((prevState)=>{
                if(prevState.currentImage === 0){
                    return{
                        currentImage: this.props.gallery.length-1
                    }
                }
                return{
                    currentImage: prevState.currentImage-1
                }
            })
        }
    }

    render(){
        return(
            <>
                <img src={`${this.props.gallery[this.state.currentImage]}`} className="cartItemGalleryImage" alt="cart item gallery" />
                {this.props.gallery.length > 1 && <div className="cartItemGalleryControls">
                    <div className="cartItemGalleryLeft" onClick={this.handleGalleryNav}>{"<"}</div>
                    <div className="cartItemGalleryRight" onClick={this.handleGalleryNav}>{">"}</div>
                </div>}
            </>
        )
    }
}
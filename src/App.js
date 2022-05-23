import { Component, createRef } from 'react'
import { gsap } from 'gsap'
import Navbar from './Components/Navbar'
import Category from './Components/Category'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            category: "Category name"
        }
    }

    // componentDidMount(){
    //     var tl = gsap.timeline({duration: 1});
    //     gsap.from(".category", {x:"", stagger:0.4})
    // }

    render(){
        const categories = ["WOMEN", "MEN", "KIDS"]
        return (
            <div className="app">
                <Navbar categories={categories}/>
                <Category category={ this.state.category }/>
            </div>
        )
    }
}
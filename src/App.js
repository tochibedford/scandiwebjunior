import { Component, createRef } from 'react'
import { gsap } from 'gsap'
import Navbar from './Components/Navbar'

export default class App extends Component{

    // componentDidMount(){
    //     var tl = gsap.timeline({duration: 1});
    //     gsap.from(".category", {x:"", stagger:0.4})
    // }

    render(){
        const categories = ["WOMEN", "MEN", "KIDS"]
        return (
            <div className="app">
                <Navbar categories={categories}/>
            </div>
        )
    }
}
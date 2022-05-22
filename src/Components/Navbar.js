import { Component } from 'react'
import storeLogo from '../images/storeLogo.svg'
import cart from '../images/cart.svg'
import Currency from './Currency';


export default class Navbar extends Component{
    constructor(props){
        super(props);
        
        // list of categories Elements
        this.categories = []
        this.props.categories.forEach((category, index)=>{
            this.categories.push(
                <li key={index} className="category">
                    {category}
                </li>
            )
        })

        
    }

    

    render(){
        return (
            <nav className="navbar">
                <ul className="navLinks">
                    {this.categories}
                </ul>
                <div className="logoImageContainer">
                    <img src={storeLogo} alt="store logo"/>
                </div>
                <div className="cartMoney">
                    <img className="cart" src={cart} alt="shopping cart icon"/>
                    <Currency />
                </div>
            </nav>
        )
    }
}
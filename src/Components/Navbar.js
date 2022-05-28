import { Component } from 'react'
import storeLogo from '../images/storeLogo.svg'
import cart from '../images/cart.svg'
import Currency from './Currency';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Navbar extends Component{
    constructor(props){
        super(props);
        
        // list of categories Elements
        this.handleNavClick = this.handleNavClick.bind(this)
        this.state = {
            categoryElem: null,
            currentCategory: this.props.match.params.category
        }
        
    }

    handleNavClick(event){
        this.props.history.push({
            pathname: `/categories/${event.target.innerText.toLowerCase()}`
        })
        this.setState(()=>{
            return({
                currentCategory: event.target.innerText.toLowerCase()
            })
        })
        this.props.refreshBodyContainer[0](event.target.innerText.toLowerCase())
    }

    componentDidMount(){
        
    }


    componentDidUpdate(){
        this.categories = []
        let cat = this.props.match.params.category
        this.props.categories.forEach((category, index)=>{
            this.categories.push(
                <li key={index} className="category" onClick={this.handleNavClick}>
                    {category}
                    <div className={`${category.toLowerCase() === this.state.currentCategory?"highlighted": ""}`}></div>
                </li>
            )
        })
    }
    

    render(){
        this.categories = []
        let cat = this.props.match.params.category
        this.props.categories.forEach((category, index)=>{
            this.categories.push(
                <li key={index} className="category" onClick={this.handleNavClick}>
                    {category}
                    <div className={`${category.toLowerCase() === this.state.currentCategory?"highlighted": ""}`}></div>
                </li>
            )
        })
        return (
            <nav className="navbar">
                <ul className="navLinks">
                    {this.categories}
                </ul>
                <div className="logoImageContainer">
                    <img src={storeLogo} alt="store logo"/>
                </div>
                <div className="cartMoney">
                    <Currency currentCurrency = {this.props.currentCurrency} changeCurrentCurrency={this.props.changeCurrentCurrency}/>
                    <img className="cart" src={cart} alt="shopping cart icon"/>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);
import { Component } from 'react'
import storeLogo from '../images/storeLogo.svg'
import Currency from './Currency';
import { withRouter } from 'react-router-dom';
import CartIcon from './CartIcon';


class Navbar extends Component{
    constructor(props){
        super(props);
        
        // list of categories Elements
        this.handleNavClick = this.handleNavClick.bind(this)
        this.refreshBodyOnChangeCurrency = this.refreshBodyOnChangeCurrency.bind(this);
        this.state = {
            categoryElem: null,
            currentCategory: this.props.match.params.category
        }
        
    }

    componentDidMount(){
        // if on a product description page set the currentCategory to same as the one in localStorage if it exists
        // else set it to the 'All' Category
        if(window.location.pathname.startsWith("/product")){
            this.setState(()=>{
                return{currentCategory: localStorage.getItem('category')?localStorage.getItem('category'):'all'}
            })
        }
    }

    handleNavClick(event){
        /* 
        if: a nav link is clicked and on we're on the category page just push the clicked category to history
        then change state of currentCategory to the same, the page will refresh on state change
        else(if we're not on a category page e.g. product description page): just change href to new link

        at the end set the 'category' property in localStorage to the same. 
        ##**** will this cause the localStorage to not be set since it can happen after a page navigation?
        */
        if(window.location.pathname.startsWith("/categories")){
            this.props.history.push({
                pathname: `/categories/${event.target.innerText.toLowerCase()}`
            })
            this.setState(()=>{
                return({
                    currentCategory: event.target.innerText.toLowerCase()
                })
            })
            this.props.refreshBodyContainer[0](event.target.innerText.toLowerCase())
        }else{
            window.location.href = `/categories/${event.target.innerText.toLowerCase()}`
        }
        localStorage.setItem('category', event.target.innerText.toLowerCase())
    }

    refreshBodyOnChangeCurrency(event){
        if(window.location.pathname.startsWith("/categories/")){
            let newCategory = this.props.history.location.pathname.split("/categories/")
            newCategory = newCategory[newCategory.length-1]
            this.props.refreshBodyContainer[0](newCategory)
        }
    }

    componentDidUpdate(){
        this.categories = []
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
                    <Currency refreshBodyOnChangeCurrency={this.refreshBodyOnChangeCurrency} currentCurrency = {this.props.currentCurrency} changeCurrentCurrency={this.props.changeCurrentCurrency}/>
                    <CartIcon cart={this.props.cart} changeCart={this.props.changeCart}/>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);
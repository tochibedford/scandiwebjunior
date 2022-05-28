import { Component, createRef } from 'react'
import {graphFetch} from './helpers'

export default class Currency extends Component{
    constructor(props){
        super(props);

        this.handleDrop = this.handleDrop.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.state = {
            currency: "",
            currencies: [],
            droppedDown: false
        }
        this.dropDownArrowRef = createRef()
        this.dropDownRef = createRef()
        this.selectRef = createRef()


    }

    componentDidMount(){
        this.currenciesArray = []
        this.currencies = []
        this.currenciesNormal = []
        let query = `
            query{
                currencies{
                    label
                    symbol
                }
            }
        `
        graphFetch(query).then(data=>{
            let currencies = []
            data.currencies.forEach((currency)=>{
                currencies.push(currency)
            })
            this.currenciesArray = currencies;
            this.setState(()=>{
                return({
                    currency: this.props.currentCurrency, // set up default currency as dollar (change this to the last one in localStorage)
                    currencies: currencies
                })
            })
        }).then(()=>{
            // list of Currency Element
            let currencies = []
            let currenciesNormal = []
            this.currenciesArray.forEach((currency, index)=>{
                currencies.push(
                    <option value={currency.symbol} key={index}>
                        {`${currency.symbol} ${currency.label}`}
                    </option>
                )
                currenciesNormal.push(
                    <div key={index} className='dropDownOption' onClick={this.handleChangeCurrency}>
                        {`${currency.symbol} ${currency.label}`}
                    </div>
                )
            })
            this.currencies = currencies;
            this.currenciesNormal = currenciesNormal;
        })

        
        this.dropDownArrowRef.current.style.transform = `rotate(${this.state.droppedDown? 0:180}deg) scaleX(1.2) translateY(4px)`
        this.dropDownRef.current.style.height = `${this.state.droppedDown? "100%":"0px"}`
        this.selectRef.current.style.width = `${this.state.currency.length*10}px`
    }

    componentDidUpdate(){
        this.dropDownArrowRef.current.style.transform = `rotate(${this.state.droppedDown? 0:180}deg) scaleX(1.2) translateY(4px)`
        this.dropDownRef.current.style.height = `${this.state.droppedDown? "169px":"0px"}`
        this.selectRef.current.style.width = `${this.state.currency.length*10}px`
    }

    handleDrop(event){
        this.setState((prevState)=>{
            return{
                droppedDown: !prevState.droppedDown
            };
        })

    }

    handleChangeCurrency(event){
        let text = event.target.innerText
        let regex = "^[a-zA-Z][^a-zA-Z0-9]|^[^a-zA-Z0-9]"
        let curr = text.match(regex)[0]
        this.selectRef.current.style.width = `${curr.length*10}px`
        this.setState(()=>{
            return{
                currency: text.match(regex)[0]
            }
        })
        this.props.changeCurrentCurrency(text.match(regex)[0])
    }

    render(){
        return (
           <div className="styledSelect" onClick={this.handleDrop}>
                <select ref={this.selectRef} value={this.state.currency} onChange={this.handleDrop} disabled className="currency currencyDropDown">
                    {this.currencies}
                </select>
                <div className="dropDownArrow" ref={this.dropDownArrowRef} style={this.dropDownStyle}> ^ </div>
                <div className='dropDown' ref={this.dropDownRef}>
                    {this.currenciesNormal}
                </div>
            </div>        
        )
    }
}
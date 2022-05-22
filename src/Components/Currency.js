import { Component, createRef } from 'react'

export default class Currency extends Component{
    constructor(props){
        super(props);

        this.handleDrop = this.handleDrop.bind(this);
        this.currenciesObj = {'$':'USD', '€':'EUR', '¥':'JPY'}
        this.state = {
            currency: "$",
            droppedDown: false
        }
        this.dropDownArrowRef = createRef()
        this.dropDownRef = createRef()

        // list of Currency Element
        this.currencies = []
        this.currenciesNormal = []
        Object.keys(this.currenciesObj).forEach((currencyKey, index)=>{
            this.currencies.push(
                <option value={currencyKey} key={index}>
                    {`${currencyKey} ${this.currenciesObj[currencyKey]}`}
                </option>
            )
            this.currenciesNormal.push(
                <div key={index} className='dropDownOption'>
                    {`${currencyKey} ${this.currenciesObj[currencyKey]}`}
                </div>
            )
        })

    }

    componentDidMount(){
        this.dropDownArrowRef.current.style.transform = `rotate(${this.state.droppedDown? 0:180}deg) scaleX(1.2) translateY(4px)`
        this.dropDownRef.current.style.height = `${this.state.droppedDown? "100%":"0px"}`
    }

    componentDidUpdate(){
        this.dropDownArrowRef.current.style.transform = `rotate(${this.state.droppedDown? 0:180}deg) scaleX(1.2) translateY(4px)`
        this.dropDownRef.current.style.height = `${this.state.droppedDown? "100%":"0px"}`
    }

    handleDrop(event){
        this.setState((prevState)=>{
            return{
                droppedDown: !prevState.droppedDown
            };
        })

    }

    render(){
        return (
           <div className="styledSelect" onClick={this.handleDrop}>
                <select value={this.state.currency} onChange={this.handleDrop} disabled className="currency currencyDropDown">
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
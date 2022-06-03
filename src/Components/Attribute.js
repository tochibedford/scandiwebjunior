import { Component } from 'react'

export default class Attribute extends Component{
    constructor(props){
        super(props);
        this.handleChangeAttribute = this.handleChangeAttribute.bind(this)
        this.state = {
            selected: window.localStorage.getItem(`${this.props.productId}-${this.props.index}`) ? window.localStorage.getItem(`${this.props.productId}-${this.props.index}`):`${0}`
        }
    }

    handleChangeAttribute(event){
        let evv = event.currentTarget.id
        this.setState(()=>{
            localStorage.setItem(`${this.props.productId}-${this.props.index}`, `${evv}`)
            return({
                selected: evv
            })
        })
        if(event.currentTarget.classList.contains('attributeSwatch')){
            let swatches = document.querySelectorAll('.attributeSwatch')
            swatches.forEach(swatch=>{
                swatch.classList.remove('attributeSwatchActive')
            })
            event.currentTarget.classList.add('attributeSwatchActive')
        }else{
            let textAttributes = document.querySelectorAll('.attributeText')
            textAttributes.forEach(text=>{
                text.classList.remove('attributeTextActive')
            })
            event.currentTarget.classList.add('attributeTextActive')
        }
    }

    render(){
        this.attributeElements = []
        if(this.props.attribute.type==="swatch"){
            this.attributeElements.push(
                <div key={this.props.index}>
                    <p className="attributeName">
                        {this.props.attribute.name.toUpperCase()}:
                    </p>
                    <ul className="attributeList">
                        {this.props.attribute.items.map((item, ind)=>{
                            if(`${ind}` === this.state.selected){
                                return(<li className="attributeSwatch attributeSwatchActive" id={ind} key={ind} onClick={this.handleChangeAttribute}> <div className={`attributeSwatchInner attributeItem`} style={{background:item.value}}></div> </li>)
                            }else{
                                return(<li className="attributeSwatch" id={ind} key={ind} onClick={this.handleChangeAttribute}> <div className={`attributeSwatchInner attributeItem`} style={{background:item.value}}></div> </li>)
                            }
                        })}
                    </ul>
                </div>  
            )
        }else{
            this.attributeElements.push(
                <div key={this.props.index}>
                    <p className="attributeName">
                        {this.props.attribute.name.toUpperCase()}:
                    </p>
                    <ul className="attributeList">
                        {this.props.attribute.items.map((item, ind)=>{
                            if(`${ind}` === this.state.selected){
                                return(<li className="attributeItem attributeText attributeTextActive" id={ind} key={ind} onClick={this.handleChangeAttribute}>{item.value}</li>)
                            }else{
                                return(<li className="attributeItem attributeText" id={ind} key={ind} onClick={this.handleChangeAttribute}>{item.value}</li>)
                            }
                        })}
                    </ul>
                </div>  
            )
        }
        return(
            <>
                {this.attributeElements}
            </>
        )
    }
}
import React from "react";
import { observer } from "mobx-react";

class WishListEdit extends React.Component {
    render() {
        const { item } = this.props
        return (
            <div className="item-edit">
                Name: <input value={item.name} opnChange={this.onNameChange} />
                <br/>
                Price: <input value={item.price} onChange={this.onPriceChange} />
                <br/>
            </div>
        )
    }

    onNameChange = event => {
        this.props.item.changeName(event.target.value)
    }

    onPriceChange = event => {
        const price = parseInt(event.target.value)
        if(!isNaN(price)) this.props.item.changePrice(price)
    }

    onImageChange = event => {
        this.props.item.changeImage(event.target.value)
    }
}

export default observer(WishListEdit);
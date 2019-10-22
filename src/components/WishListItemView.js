import React from "react"
import { observer } from "mobx-react";

import WishListItemEdit from "./WishListItemEdit";

class WishListItemView extends React.Component {
    constructor() {
        super()
        this.state = { isEditing: false }
    }

    render() {
        const { item } = this.props;
        return (
            this.state.isEditing ? (
                this.renderEditable()
            ) : (
                <li className="item">
                    {item.image && <img src={item.image} />}
                    <h3>{item.name}</h3>
                    <span>{item.price}</span>
                    <button onClick={this.onToggleEdit}>Edit</button>
                </li>
            )
        )
    }

    renderEditable() {
        return (
            <li className="item">
                <WishListItemEdit item={this.props.item} />
            </li>
        )
    }

    onToggleEdit = () => {
        this.setState({ isEditing: true })
    }
}

export default observer(WishListItemView);
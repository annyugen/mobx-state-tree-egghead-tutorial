import React from "react"
import { observer } from "mobx-react";
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";
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
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                    <button onClick={this.onToggleEdit}>Edit</button>
                    <button onClick={item.remove}>Delete</button>
                </li>
            )
        )
    }

    renderEditable() {
        return (
            <li className="item">
                <WishListItemEdit item={this.state.clone} />
                <button onClick={this.onSaveEdit}>Save</button>
                <button onClick={this.onCancelEdit}>Cancel</button>
            </li>
        )
    }

    onToggleEdit = () => {
        this.setState({ 
            isEditing: true,
            clone: clone(this.props.item)
        })
    }

    onCancelEdit = () => {
        this.setState({ isEditing: false })
    }

    onSaveEdit = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone))
        this.setState({
            isEditing: false,
            clone: null
        })
    }
}

export default observer(WishListItemView);
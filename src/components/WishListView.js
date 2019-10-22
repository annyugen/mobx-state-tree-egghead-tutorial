import React from "react";
import { observer } from "mobx-react";
import WishListItemView from "./WishListItemView";

const WishListView = ({ wishList }) => (
    <div className="list">
        <ul>
            {wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)}
            Total: {wishList.totalPrice}$
        </ul>
    </div>
)

export default observer(WishListView);
import React from "react";
import { observer } from "mobx-react";
import WishListItemView from "./WishListItemView";
import WishListItemEntry from "./WishListItemEntry";

const WishListView = ({ wishList }) => (
    <div className="list">
        <ul>
            {wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)}
            Total: {wishList.totalPrice}$
            <WishListItemEntry wishList={wishList} />
        </ul>
    </div>
)

export default observer(WishListView);
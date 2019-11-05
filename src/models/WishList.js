import { types, getParent, destroy } from "mobx-state-tree";

export const WishListItem = types.model({
    name: types.string,
    price: types.number,
    image: types.optional(types.string, "")
}).actions(self => ({
    changeName(newName) {
        self.name = newName
    },
    changePrice(newPrice) {
        self.price = newPrice
    },
    changeImage(newImage) {
        self.image = newImage
    },
    remove() {
        getParent(self, 2).remove(self) // This is the same as getParent(getParent(self).remove(self))
    }
}));

export const WishList = types.model({
    items: types.optional(types.array(WishListItem), []),
}).actions(self => ({
    add(item) {
        self.items.push(item)
    },
    remove(item) {
        destroy(item)
    }    
})).views(self => ({
    get totalPrice() {
        return self.items.reduce((sum, entry) => sum + entry.price, 0)
    }
}))
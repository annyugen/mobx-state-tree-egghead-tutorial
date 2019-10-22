import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { WishListItem, WishList } from "./WishList";
import { reaction } from "mobx";

it("can create WishListItem model", () => {
    const item = WishListItem.create({
        name: "Fake name",
        price: 10,
        image: "Fake image path"
    })

    expect(item.name).toBe("Fake name");
    expect(item.price).toBe(10);
    expect(item.image).toBe("Fake image path");
    item.changeName("New fake name");
    expect(item.name).toBe("New fake name");
})

it("can create WishList model", () => {
    const list = WishList.create({
        items: [
            {
                name: "Fake name",
                price: 10,
                image: "Fake image path"
            }
        ]
    })

    expect(list.items.length).toBe(1);
})

it("can add items", () => {
    const list = WishList.create()

    const states = [];
    const patches = [];

    // Listen to patches, listen to action changes, json change. Describe the changes not the state
    onPatch(list, patch => {
        patches.push(patch)
    })

    // onSnapshot listen to changes whenever model changes
    onSnapshot(list, snapshot => {
        states.push(snapshot)
    })

    list.add(WishListItem.create({
            name: "Fake name",
            price: 10,
            image: "Fake image path"
        })
    )

    expect(list.items[0].name).toBe("Fake name")

    // These accomplish the same functionality
    expect(getSnapshot(list)).toEqual({
        items: [{
            name: "Fake name",
            price: 10,
            image: "Fake image path"
        }]
    })
    expect(getSnapshot(list)).toMatchSnapshot();
})

it("can calculate totalPrice", () => {
    const list = WishList.create({
        items: [
            {
                name: "Fake name",
                price: 10,
                image: "Fake image path"
            },
            {
                name: "Fake name 2 ",
                price: 12,
                image: "Fake image path 2"
            }
        ]
    })

    expect(list.totalPrice).toBe(22);
    let changes = 0;

    // Mobx healper that callback when there's change to the function
    reaction(() => list.totalPrice, () => changes++)

    expect(changes).toBe(0)
    list.items[0].changeName("Test")
    list.items[0].changePrice(20)

    expect(changes).toBe(1);
})
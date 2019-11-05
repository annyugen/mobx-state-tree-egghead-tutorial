import { types, flow } from "mobx-state-tree";
import { WishList } from "./WishList";

const User = types.model({
    id: types.string,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {}),
    recipient: types.string //type string since we gonna reference User id instead
})
.actions(self => ({
    getSuggestions: flow(function * () {
        const response = yield window.fetch(`http://localhost:3001/suggestions_${self.gender}`)
        const suggestions = yield response.json();
        self.addSuggestions(suggestions);
        self.wishList.items.push(... suggestions)
    }),
}))

export const Group = types.model({
    users: types.map(User),
})
.actions(self => ({
    drawLots() {
        const allUsers = Array.from(self.users.values())

        // not enough users, bail out
        if (allUsers.length <= 1) return

        // not assigned lots
        let remaining = allUsers.slice()

        allUsers.forEach(user => {
            // edge case: the only person without recipient
            // is the same as the only remaining lot
            // swap lot's with some random other person
            if (remaining.length === 1 && remaining[0] === user) {
                const swapWith = allUsers[Math.floor(Math.random() * (allUsers.length - 1))]
                user.recipients = swapWith.recipient
                swapWith.recipient = self
            } else
                while (!user.recipient) {
                    // Pick random lot from remaing list
                    let recipientIdx = Math.floor(Math.random() * remaining.length)

                    // If it is not the current user, assign it as recipient
                    // and remove the lot
                    if (remaining[recipientIdx] !== user) {
                        user.recipient = remaining[recipientIdx]
                        remaining.splice(recipientIdx, 1)
                    }
                }
        })
    }
}))

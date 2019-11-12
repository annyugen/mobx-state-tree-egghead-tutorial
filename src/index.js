import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { onSnapshot, getSnapshot } from "mobx-state-tree";
import { Group } from "./models/Group";
import { WishList } from "./models/WishList";

let initialState = { users: {}}

if(localStorage.getItem("wishlistapp")) {
    const json = JSON.parse(localStorage.getItem("wishlistapp"))
    if (WishList.is(json)) initialState = json;
}

const wishList = WishList.create(initialState)
const group = window.group = Group.create(initialState)
onSnapshot(wishList, snapshot => {
    localStorage.setItem("wishlistapp", JSON.stringify(snapshot))
})
function renderApp() {
    ReactDOM.render(<App wishList={wishList} group={group}/>, document.getElementById('root'));
}

renderApp()

if(module.hot) {
    module.hot.accept(["./components/App"], () => {
        // render for new components
        renderApp();
    })

    module.hot.accept(["./models/WishList"], () => {
        // render for new model definition
        let wishList;
        const snapShot = getSnapshot(wishList);
        group = window.group = Group.create(snapShot);
        wishList = WishList.create(snapShot);
        renderApp();
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

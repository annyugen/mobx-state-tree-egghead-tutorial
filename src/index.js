import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { WishList } from "./models/WishList";

const wishList = WishList.create({
    items: [
        {
            name: "Name 1",
            price: 10,
            image: "Image 1"
        },
        {
            name: "Name 2",
            price: 20,
            image: "Image 2"
        }
    ]
})

ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

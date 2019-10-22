import React from 'react';
import '../App.css';
import WishListView from "./WishListView"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a>
            Wish List        
          </a>
          <WishListView wishList={this.props.wishList}/>
        </header>
      </div>
    );
  }
}

export default App;

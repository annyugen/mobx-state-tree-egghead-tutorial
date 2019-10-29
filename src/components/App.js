import React from 'react';
import '../App.css';
import WishListView from "./WishListView"

class App extends React.Component {
  constructor(props) {
    super()
    this.state = { selectedUser: null }  
  }
  
  render() {
    const { group } = this.props;
    const selectedUser = group.users.get(this.state.selectedUser)

    return (
      <div className="App">
        <header className="App-header">
          <a>
            Wish List        
          </a>
          <select onChange={this.onSelectUser}>
          <option>- Select User -</option>
          {/* {group.users.values().map(user => 
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            )} */}
        </select>
        { selectedUser && <WishListView wishList={selectedUser.wishList}/> }
        </header>
      </div>
    );
  }
  onSelectUser = evt => {
    this.setState({ selectedUser: evt.target.value })
  }
}

export default App;

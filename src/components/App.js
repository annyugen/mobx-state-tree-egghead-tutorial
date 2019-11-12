import React from 'react';
import { values } from 'mobx';

import '../App.css';
import WishListView from "./WishListView"
import { observer } from 'mobx-react';

class App extends React.Component {
  constructor(props) {
      super()
      this.state = { selectedUser: null }
  }

  render() {
      const { group } = this.props
      const selectedUser = group.users.get(this.state.selectedUser)
      return (
          <div className="App">
              <header className="App-header">
                    <h1 className="App-title">WishList</h1>
                <button onClick={group.reload}>Reload</button>
                <select onChange={this.onSelectUser}>
                    <option>- Select user -</option>
                    {/* Array.from converts an iterable to array, so that we can map over it */}
                    {/* We can also use values function from mobx to do the same thing */}
                    {Array.from(group.users.values()).map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button onClick={group.drawLots}>Draw lots</button>
                {selectedUser && <User user={selectedUser} />}
              </header>

          </div>
      )
  }

  onSelectUser = event => {
      this.setState({ selectedUser: event.target.value })
  }
}

const User = observer(({ user }) => (
  <div>
      <WishListView wishList={user.wishList} />
      <button onClick={user.getSuggestions}>Suggestions</button>
      <hr />
      <h2>{user.recipient ? user.recipient.name : ""}</h2>
      {user.recipient && <WishListView wishList={user.recipient.wishList} readonly />}
  </div>
))

export default observer(App)

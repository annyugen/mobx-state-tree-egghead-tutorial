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
				{/* values() function from mobx is required to map a types.map; Tutorial method is outdated! Or use Array.from */}
				{values(group.users).map(user => 
					<option key={user.id} value={user.id}>
						{user.name}
					</option>
				)}
			</select>
			<button onClick={group.drawLots}>Draw lots</button>
                {selectedUser && <User user={selectedUser} />}
        </header>
      </div>
    );
  }
  onSelectUser = evt => {
    this.setState({ selectedUser: evt.target.value })
  }

  
}

const User = observer(({ user }) => (
	<div>
		<WishListView wishList={user.wishList} />
		<button onClick={user.getSuggestions} >Suggestion</button>}
		<hr />
		<h2>{user.recipient ? user.recipient: ""}</h2>
	</div>
))

export default App;

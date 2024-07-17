import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";

const UserListFC = () => {
    const {users, status, idSelectedUser } = useSelector( (state: RootState) => state.persons );
    const dispatch: AppDispatch = useDispatch();

    const [userName, setUserName] = useState<string>("");
    const [companyName, setComnanyName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    
    return ( idSelectedUser ? (status.id) :(

        <div className="container mt-4">
      <h1 className="mb-4 text-center">User List App</h1>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          value={this.state.newUser.name}
          name="name"
          onChange={(e) =>
            this.setState({
                ...this.state,
              newUser: { ...this.state.newUser, name: e.target.value },
            })
          }
          // onChange={(e) =>
          //   this.setState({ ...this.state, newUser: { ...this.state.newUser, name: e.target.value}})
          // }
          placeholder="New User Name"
        />
        <input
          className="form-control"
          type="text"
          value={this.state.newUser.phone}
          name="phone"
          onChange={(e) =>
            this.setState({
              ...this.state,
              newUser: { ...this.state.newUser, phone: e.target.value },
            })
          }
          placeholder="New User Phone"
        />
        <input
          className="form-control"
          type="text"
          value={this.state.newUser.company.name}
          name="company"
          onChange={(e) =>
            this.setState({
              ...this.state,
              newUser: {
                ...this.state.newUser,
                company: { name: e.target.value },
              },
            })
          }
          placeholder="New Company"
        />
        <button className="btn btn-primary" onClick={() => {
            dispatch(addUsers({
                id: users.length,
                name: userName,
                company: { name: companyName},
                
            }))
        }}>
          Add User
        </button>
      </div>
      <div>
        {this.state.users.map((user) => (
          <User
            key={user.id}
            user={user}
            deleteUser={() => this.deleteUser(user.id)}
            editUser={this.editUser}
            changeIsDetails={ this.changeIsDetails }
            setUser={this.props.setChange}
            setChange={this.props.setChange}
          />
        ))}
      </div>
    </div>
)
  );
}
import { ChangeEvent, Component, ReactNode } from "react";
import { IUser } from "./UserList";
import style from "../styles/User.module.css";
import axios from "axios";

interface IProps {
  user: IUser;
  deleteUser: () => void;
  editUser: (user: IUser) => void;
}

interface IState {
  isEdit: boolean;
  hasDetail: boolean;
  name: string;
  company: string;
  phone: string;
}

interface IUserDetail {
  id: number;
  name: string;
  phone: string;
  username: string;
  email: string;
  website: string;
  address: {
    street: string;
    city: string;
  };
  company: { name: string };
}

export default class User extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isEdit: false,
      hasDetail: false,
      name: props.user.name,
      company: props.user.company.name,
      phone: props.user.phone,
    };
  }

  toggleEdit = () => {
    this.setState((prevState) => ({ ...prevState, isEdit: !prevState.isEdit }));

    /*    this.setState( (prevState) => {
      return {...prevState, isEdit: !prevState.isEdit}
    } )                                                 */
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
    // this.setState( (prevState) => ({ ...prevState, [e.target.name]: e.target.value}) )
  };

  saveUser = () => {
    const { company, name, phone } = this.state;
    const { editUser, user } = this.props;
    const updatedUser = {
      //TODO
      ...user,
      name,
      company: { name: company },
      phone,
    };
    editUser(updatedUser);
    this.toggleEdit();
  };

  detailedInformation = () => {
    const id = this.props.user.id;
    this.setState((prevState) => ({ ...prevState, hasDetail: !prevState.hasDetail }));

    if (this.state.isEdit) {
      
      axios
      .get<IUserDetail[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {response.data.find
        .then((response) => {response.data.find
        
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    console.log("Input has been clicked with id: " + id);
  };

  render(): ReactNode {
    return (
      <div className="card mb-3" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div className="card-body">
          {this.state.isEdit ? (
            <div>
              <input
                className="form-control mb-2"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                className="form-control mb-2"
                name="company"
                value={this.state.company}
                onChange={this.handleChange}
              />
              <input
                className="form-control mb-2"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
              <button className="btn btn-success btn-sm me-2" onClick={this.saveUser}>
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              {this.state.hasDetail ? (
                <div onClick={this.detailedInformation}>
                  <h2 className="card-title">User Detailed information</h2>
                  <h5 className="card-subtitle mb-2 text-muted">User id:</h5>
                  <h5 className="card-subtitle mb-2 text-muted">User Name</h5>
                  <h5 className="card-subtitle mb-2 text-muted">User username</h5>
                  <h5 className="card-subtitle mb-2 text-muted">Phone</h5>
                  <h5 className="card-subtitle mb-2 text-muted">email</h5>
                  <h5 className="card-subtitle mb-2 text-muted">website:</h5>
                  <h5 className="card-subtitle mb-2 text-muted">Address</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Street</h6>
                  <h6 className="card-subtitle mb-2 text-muted">City</h6>
                  <h5 className="card-subtitle mb-2 text-muted">Company</h5>
                </div>
              ) : (
                <h6 className="card-title">without Detailed information</h6>
                
              )}
              <div style={{ flexGrow: 1 }} onClick={this.detailedInformation}>
                <h5 className="card-title">{this.props.user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {this.props.user.company.name}
                </h6>
                <p className={`card-text ${style.color}`}>
                  {this.props.user.phone}
                </p>
              </div>
              <button onClick={this.toggleEdit} className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button onClick={this.props.deleteUser} className="btn btn-danger btn-sm">
                Del
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

import axios from "axios";
import { Component, ReactNode } from "react";

export interface IUser {
  id: number;
  name: string;
  company: { name: string };
  phone: string;
}

interface IState {
  users: IUser[];
  newUser: Omit<IUser, "id">;
  // newName: string,
  // newCompany: string,
  // newPhone: string
}

class UserList extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      users: [],
      newUser: {
        company: {
          name: "",
        },
        name: "",
        phone: "",
      },
      // newCompany: '',
      // newName: '',
      // newPhone: ''
    };
  }

  componentDidMount(): void {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        this.setState({ ...this.state, users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addUser = () => {
    this.setState((prevState) => ({
      users: [
        {
          id: this.state.users.length + 1,
          company: { name: this.state.newUser.company.name },
          name: this.state.newUser.name,
          phone: this.state.newUser.phone,
        },
        ...prevState.users,
      ],
      newUser: {
        company: {
            name: ''
        },
        name: '',
        phone: ''
      }
    }));
  };

  deleteUser = (userId: number) => {
    this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== userId),
        newUser: { ...prevState.newUser }
    }))
  }

  render(): ReactNode {
    return <>UserList</>;
  }
}

export default UserList;

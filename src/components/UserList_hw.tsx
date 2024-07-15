import { useEffect, useState } from "react";
// import axios from "axios";

export interface IUser {
  name: string;
  city: string;
}

const UserList = () => {
  const [user, setUsers] = useState<IUser[]>([]);
  const [newUser, setNewUser] = useState<Omit<IUser, 'updatedAt'>>({
    name: "",
    city: "",
  });

   useEffect(() => {
    const fetchTodos = async () => {
      try {
        // const data = (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setUsers(
          sortByDate(
            data
              .splice(0, 10)
              .map((e: {name: string, city: number}) => ({
                title: e.name,
                city: e.address.city,
                
              }))
          )
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const addUser = () => {
    if (newUser.name.trim()) {
      const usersCopy = [...users];
      usersCopy.unshift({ ...newUser});
      setUsers(usersCopy);
      setNewUser({
        name: "",
        city: 0,
      });
    }
  };


};

export default UserList;

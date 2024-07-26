import SearchBar from "./Searchbar";
import AddUserForm from "./AddUserForm";
import Robot from "./Robot";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUsers, openForm, closeForm } from "./userSlice";
import { Button } from "@mui/material";

export default function Container() {
  const dispatch = useDispatch();
  ////////////////////////
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((users) => {
        const updatedUsers = users.map((user) => ({
          ...user,
          pic: `https://robohash.org/${user.username}`,
        }));
        dispatch(setUsers(updatedUsers));
      });
  }, [dispatch]);
  /////////////////////////
  const users = useSelector((state) => state.users.users);
  const isOpen = useSelector((state) => state.users.isOpen);

  const [filterText, setFilterText] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser));
    dispatch(closeForm());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="flexRow">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <Button variant="contained" onClick={() => dispatch(openForm())} className="addUserButton">
          Add Robot
        </Button>
      </div>
      {isOpen && <AddUserForm addUser={handleAddUser} />}
      <div className="robotList">
        {filteredUsers.map((user) => (
          <Robot key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
}

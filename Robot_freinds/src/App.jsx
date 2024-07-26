import { useState } from "react";
import "./App.css";
import Container from "./Container";
import RobotDetails from "./RobotDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ErrorPage from "./error-page";

export default function App() {
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     pic: "https://robohash.org/user1",
  //     name: "User 1",
  //     username: "user1",
  //     email: "user1@example.com",
  //     address: {
  //       street: "123 Street",
  //       city: "City A",
  //     },
  //     phone: "123-456-7890",
  //   },
  //   {
  //     id: 2,
  //     pic: "https://robohash.org/user2",
  //     name: "User 2",
  //     username: "user2",
  //     email: "user2@example.com",
  //     address: {
  //       street: "456 Avenue",
  //       city: "City B",
  //     },
  //     phone: "234-567-8901",
  //   },
  //   {
  //     id: 3,
  //     pic: "https://robohash.org/user3",
  //     name: "User 3",
  //     username: "user3",
  //     email: "user3@example.com",
  //     address: {
  //       street: "789 Road",
  //       city: "City C",
  //     },
  //     phone: "345-678-9012",
  //   },
  // ]);

  // const addUser = (newUser) => {
  //   setUsers([...users, newUser]);
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="app">
          <h1 className="title">RoboFriends</h1>
          <Container />
        </div>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "robotDetails/:id",
      element: <RobotDetails />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

import { createSlice } from '@reduxjs/toolkit';
// import edit from './EditUser';
import { useEffect } from 'react';

const initialState = {
  // users: [
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
  // ],

  users: [],
  isOpen: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    openForm: (state) => {
      state.isOpen = true;
    },
    closeForm: (state) => {
      state.isOpen = false;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    editUser: (state) => {
      const i = state.users.findIndex((user) => user._id === action.payload._id)
      if (i !== -1) {
        state.users[i] = action.payload
      }
    }
  },
});

export const { addUser, setUsers, openForm, closeForm, editUser } = userSlice.actions;
export default userSlice.reducer;

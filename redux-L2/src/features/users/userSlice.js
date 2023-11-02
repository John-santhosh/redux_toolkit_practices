import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Dave grey" },
  { id: 2, name: "smith Josh" },
  { id: 3, name: "Emilia Clark" },
];
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;

export const selectAllUsers = (state) => state.users;

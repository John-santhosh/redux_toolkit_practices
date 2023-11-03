import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../API/axios";

const USERS_URL = "/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios(USERS_URL);
  console.log(response);
  return response.data;
});

const initialState = [
  // { id: 1, name: "Dave grey" },
  // { id: 2, name: "smith Josh" },
  // { id: 3, name: "Emilia Clark" },
];
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, () => {
        // state.status = "pending";
        // do some actions
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action);
        return action.payload;
      })
      .addCase(fetchUsers.rejected, () => {
        // do some actions
      });
  },
});

export default userSlice.reducer;

export const selectAllUsers = (state) => state.users;

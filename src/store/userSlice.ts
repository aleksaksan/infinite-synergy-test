import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/userService";

export interface IUser {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  company: string;
};

interface UsersState {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
  selectedUser: IUser | null;
};

const initialState: UsersState = {
  users: [],
  isLoading: true,
  error: null,
  selectedUser: null,
};

export const loadUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => await fetchUsers()
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<IUser>) {
      state.selectedUser = action.payload;
    },
    updateUser(state, action: PayloadAction<IUser>) {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload];
        state.isLoading = false;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load users';
      });
  }
});

export const { selectUser, updateUser } = usersSlice.actions;

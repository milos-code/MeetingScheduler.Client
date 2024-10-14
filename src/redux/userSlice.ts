import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../api/axiosClient";
import { IUser } from "../models";
import { authService } from "../services/authService";
import { getAllMeetingRooms } from "./meetingRoomSlice";
import { loadEmployees } from "./employeesSlice";
import { loadEmployeeMeetingsWithPeopleManager, loadMeetings } from "./meetingSchedulerSlice";
import { PURGE } from "redux-persist";

interface CreateUserArgs{
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  position: string;
}

interface RegisterUserArgs{
  email: string;
  password: string;
  confirmPassword: string;
  token: string | null;
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/authentication/login", credentials);
      authService.setTokens(response.data.token, response.data.refreshToken);

      const userResponse = await axiosClient.get("/User/GetUserByUserName");
      const user = userResponse.data;

      dispatchRoleBasedActions(user.roleNames[0], dispatch);

      return user;

    } catch (error: any) {
      return rejectWithValue("Invalid email or password");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async(credentials: RegisterUserArgs, { rejectWithValue }) => {
    try {
      const { email, password, confirmPassword, token } = credentials;
      const response = await axiosClient.post("/Authentication/Register", 
        { email, password, confirmPassword, token}
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/User/GetAllUsers");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async({firstName, lastName, email, position, role}: CreateUserArgs, {rejectWithValue} ) => {
    try {
      const response = await axiosClient.post("/User/CreateUser", 
        {firstName, lastName, email, position, roleName: role});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async(userId: string, {rejectWithValue}) => {
    try {
      await axiosClient.delete(`/User/DeleteUser?userId=${userId}`);
      return userId; // Return the userId we used for deletion
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Deletion failed");
    }
  }
);

function dispatchRoleBasedActions(userRole: string, dispatch: any) {
  dispatch(getAllMeetingRooms());
  switch (userRole) {
    case "Admin":
      dispatch(fetchAllUsers());
      break;
    case "PeopleManager":
      dispatch(loadEmployees());
      dispatch(loadMeetings());
      break;
    case "Employee":
      dispatch(loadEmployeeMeetingsWithPeopleManager());
      break;
    default:
      break;
  }
}

interface LogedInUserState {
  loggedInUser: IUser | null;
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: LogedInUserState = {
  loggedInUser: null,
  loading: false,
  error: null,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(PURGE, ()=> {
        return initialState;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state,action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to delete user";
      });
  },
});

export const { reset: resetUser } = userSlice.actions;

export default userSlice.reducer;

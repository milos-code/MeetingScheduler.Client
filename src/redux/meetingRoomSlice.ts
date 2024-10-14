import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../api/axiosClient";
import { IMeetingRoom } from "../models";
import { PURGE } from "redux-persist";

interface CreateMeetingRoomArgs {
  meetingRoom: IMeetingRoom;
}

export const createMeetingRoom = createAsyncThunk(
  "meetingRoom/createMeetingRoom",
  async ({ meetingRoom }: CreateMeetingRoomArgs, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/meetingRoom/CreateMeetingRoom", meetingRoom);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllMeetingRooms = createAsyncThunk(
  "meetingRoom/getAllMeetingRooms",
  async () => {
    const response = await axiosClient.get("/meetingRoom/GetAllMeetingRooms");
    return response.data;
  }
);

export const deleteMeetingRoom = createAsyncThunk(
  "meetingRoom/deleteMeetingRoom",
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/MeetingRoom/DeleteMeetingRoom?roomId=${roomId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred while deleting the meeting room.");
    }
  }
);

interface MeetingRoomState {
  meetingRooms: IMeetingRoom[];
  loading: boolean;
  error: string | null;
}

const initialState: MeetingRoomState = {
  meetingRooms: [],
  loading: false,
  error: null,
};

const meetingRoomSlice = createSlice({
  name: "meetingRoom",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeetingRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMeetingRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.meetingRooms.push(action.payload);
      })
      .addCase(createMeetingRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllMeetingRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMeetingRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.meetingRooms = action.payload;
      })
      .addCase(getAllMeetingRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMeetingRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMeetingRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.meetingRooms = state.meetingRooms.filter(room => room.id !== action.meta.arg);
      })
      .addCase(deleteMeetingRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(PURGE, ()=> {
        return initialState;
      });
  },
});

export const { reset: resetMeetingRoom } = meetingRoomSlice.actions;

export default meetingRoomSlice.reducer;

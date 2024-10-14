import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../api/axiosClient";
import { IUser } from "../models";
import { PURGE } from "redux-persist";

interface CreateMeetingArgs {
  meetingTopic: string;
  roomId: string;
  employeesIds: string[];
  meetingStartTime: string;
  meetingEndTime: string;
}

interface EmployeeCreateMeetingArgs {
  meetingTopic: string;
  roomId: string;
  meetingStartTime: string;
  meetingEndTime: string;
}

interface Meeting {
  id: string;
  meetingTopic: string;
  roomName: string | null;
  users: IUser[];
  creationDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  status: number;
}

interface MeetingState {
  loading: boolean;
  error: string | null;
  success: boolean;
  meetings: Meeting[];
}

const initialState: MeetingState = {
  loading: false,
  error: null,
  success: false,
  meetings: [],
};

export const scheduleMeeting = createAsyncThunk(
  "meetingScheduler/scheduleMeeting",
  async (
    {
      meetingTopic,
      roomId,
      employeesIds,
      meetingStartTime,
      meetingEndTime,
    }: CreateMeetingArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        "/Meeting/CreateMeeting",
        {
          meetingTopic,
          roomId,
          employeesIds,
          meetingStartTime,
          meetingEndTime,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error details:", error);
      return rejectWithValue("Failed to create the meeting.");
    }
  }
);

export const employeeScheduleMeeting = createAsyncThunk(
  "meetingScheduler/employeeScheduleMeeting",
  async (
    {
      meetingTopic,
      roomId,
      meetingStartTime,
      meetingEndTime,
    }: EmployeeCreateMeetingArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        "/Meeting/EmployeeCreateMeeting",
        {
          meetingTopic,
          roomId,
          meetingStartTime,
          meetingEndTime,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error details:", error);
      return rejectWithValue("Failed to create the meeting.");
    }
  }
);

export const loadMeetings = createAsyncThunk(
  "meetingScheduler/fetchMeetings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/Meeting/GetAllMeetings");
      return response.data;
    } catch (error) {
      console.error("Error fetching meetings:", error);
      return rejectWithValue("Failed to fetch meetings.");
    }
  }
);

export const loadEmployeeMeetingsWithPeopleManager = createAsyncThunk(
  "meetingScheduler/fetchMeetings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/Meeting/GetAllMeetingsForEmployeeWithPeopleManager");
      return response.data;
    } catch (error) {
      console.error("Error fetching meetings:", error);
      return rejectWithValue("Failed to fetch meetings.");
    }
  }
);

const meetingSchedulerSlice = createSlice({
  name: "meetingScheduler",
  initialState,
  reducers: {
    reset: () => initialState,
    resetSuccess: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleMeeting.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(scheduleMeeting.fulfilled, (state, action: PayloadAction<Meeting>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.meetings.push(action.payload);
      })
      .addCase(scheduleMeeting.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(employeeScheduleMeeting.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(employeeScheduleMeeting.fulfilled, (state, action: PayloadAction<Meeting>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.meetings.push(action.payload);
      })
      .addCase(employeeScheduleMeeting.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(loadMeetings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMeetings.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.loading = false;
        state.meetings = action.payload;
        state.error = null;
      })
      .addCase(loadMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(PURGE, ()=> {
        return initialState;
      });
  },
});

export const { reset: resetMeeting, resetSuccess } = meetingSchedulerSlice.actions;
export default meetingSchedulerSlice.reducer;

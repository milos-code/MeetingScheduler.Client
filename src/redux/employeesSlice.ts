import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../api/axiosClient";
import { IEmployee } from "../models";
import { PURGE } from "redux-persist";

interface EmployeesState {
  employees: IEmployee[];
  managedEmployees: IEmployee[];
  loading: boolean;
  error: string | null;
}
const initialState: EmployeesState = {
  employees: [],
  managedEmployees: [],
  loading: false,
  error: null,
};

export const loadEmployees = createAsyncThunk(
  "employees/loadEmployees",
  async () => {
    const [freeUsers, usersForManagerResponse] = await Promise.all([
      axiosClient.get("/User/GetAllFreeEmployees"),
      axiosClient.get("/User/GetUsersForPeopleManager"),
    ]);

    return {
      freeUsers: freeUsers.data,
      managedEmployees: usersForManagerResponse.data,
    };
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (selectedEmployeeId: string) => {
    await axiosClient.post(
      "/User/AssignEmployeeToPeopleManager",
      { userId: selectedEmployeeId }
    );
    return { selectedEmployeeId };
  }
);

export const removeEmployee = createAsyncThunk(
  "employees/removeEmployee",
  async (employeeId: string) => {
    await axiosClient.post(
      "/User/UnassignEmployeeToPeopleManager",
      { userId: employeeId }
    );
    return { employeeId };
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.employees = action.payload.freeUsers;
        state.managedEmployees = action.payload.managedEmployees;
        state.loading = false;
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load employees";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        const employeeToAdd = state.employees.find(
          (emp) => emp.id === action.payload.selectedEmployeeId
        );
        if (employeeToAdd) {
          state.employees = state.employees.filter(
            (emp) => emp.id !== action.payload.selectedEmployeeId
          );
          state.managedEmployees.push(employeeToAdd);
        }
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        const employeeToRemove = state.managedEmployees.find(
          (emp) => emp.id === action.payload.employeeId
        );
        if (employeeToRemove) {
          state.managedEmployees = state.managedEmployees.filter(
            (emp) => emp.id !== action.payload.employeeId
          );
          state.employees.push(employeeToRemove);
        }
      })
      .addCase(PURGE, ()=> {
        return initialState;
      });
  },
});

export const { reset: resetEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;

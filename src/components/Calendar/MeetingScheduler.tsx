import { setHours, setMinutes } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeScheduleMeeting,
  resetSuccess,
  scheduleMeeting,
} from "../../redux/meetingSchedulerSlice";
import { AppDispatch, RootState } from "../../redux/store";
import MultiSelectDropdown from "./EmployeesDropdown";
import MeetingRoomDropdown from "./MeetingRoomDropdown";
import "./MeetingScheduler.css";

interface MeetingSchedulerProps {
  closePopup: () => void;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ closePopup }) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), new Date().getHours() + 1)
  );
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState<string[]>(
    []
  );
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [meetingTopic, setMeetingTopic] = useState<string>("");
  const meetingState = useSelector(
    (state: RootState) => state.meetingScheduler
  );
  const managedEmployees = useSelector(
    (state: RootState) => state.employees.managedEmployees
  );

  const { loggedInUser: value } = useSelector((state: RootState) => state.user);
  const userRole = value?.roleNames?.[0] || "";

  const isPeopleManager = userRole === "PeopleManager";

  const { isValid, errorMessage } = useMemo(() => {
    const now = new Date();
    if (!selectedStartDate || !selectedEndDate) {
      return { isValid: false, errorMessage: "Please select both start and end times for the meeting." };
    }
    if (selectedStartDate < now) {
      return { isValid: false, errorMessage: "Meeting Start time in the past" };
    }
    if (selectedEndDate <= selectedStartDate) {
      return { isValid: false, errorMessage: "Meeting End time can't be before the meeting Start time" };
    }
    return { isValid: true, errorMessage: null };
  }, [selectedStartDate, selectedEndDate]);

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
  };

  const handleEmployeeChange = (selectedIds: string[]) => {
    setSelectedEmployeesIds(selectedIds);
  };

  const handleRoomChange = (roomId: string | null) => {
    setSelectedRoomId(roomId);
  };

  const handleMeetingTopicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMeetingTopic(event.target.value);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    if (
      selectedStartDate &&
      selectedEndDate &&
      selectedRoomId &&
      meetingTopic
    ) {
      const commonMeetingData = {
        meetingTopic,
        roomId: selectedRoomId,
        meetingStartTime: selectedStartDate.toISOString(),
        meetingEndTime: selectedEndDate.toISOString(),
      };

      if (isPeopleManager) {
        if (selectedEmployeesIds.length > 0) {
          dispatch(
            scheduleMeeting({
              ...commonMeetingData,
              employeesIds: selectedEmployeesIds,
            })
          );
        } else {
          console.error("People Manager must select employees for the meeting");
        }
      } else {
        dispatch(employeeScheduleMeeting(commonMeetingData));
      }
    } else {
      console.error("All required fields must be filled");
    }
  };

  useEffect(() => {
    if (meetingState.success) {
      closePopup();
      dispatch(resetSuccess());
    }
  }, [meetingState.success, closePopup, dispatch]);

  return (
    <div className="meeting-scheduler-container">
      <h2>Schedule a Meeting</h2>
      <div className="scheduler-form">
        <div className="form-group">
          <label>Meeting Room:</label>
          <MeetingRoomDropdown
            selectedRoomId={selectedRoomId}
            onChange={handleRoomChange}
          />
        </div>
        {isPeopleManager && (
          <div className="form-group">
            <label>Invite Employees:</label>
            <MultiSelectDropdown
              options={managedEmployees}
              selectedOptions={selectedEmployeesIds}
              onChange={handleEmployeeChange}
            />
          </div>
        )}
        <div className="form-group">
          <label>Meeting Start:</label>
          <DatePicker
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="date-picker"
            placeholderText="Click to select date and time"
          />
        </div>
        <div className="form-group">
          <label>Meeting End:</label>
          <DatePicker
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="date-picker"
            placeholderText="Click to select date and time"
          />
        </div>
        <div className="form-group">
          <label>Meeting Topic:</label>
          <input
            type="text"
            value={meetingTopic}
            onChange={handleMeetingTopicChange}
            placeholder="Enter the meeting topic"
            className="meeting-topic-input"
          />
        </div>
        <div className="button-container">
          <button onClick={closePopup} className="exit-popup-button">
            Exit
          </button>
          <button
            onClick={handleSubmit}
            className="schedule-meeting-button"
            disabled={!isValid || meetingState.loading}
          >
            {meetingState.loading ? "Scheduling..." : "Schedule Meeting"}
          </button>
        </div>
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        {meetingState.error && (
          <p className="error-message">{meetingState.error}</p>
        )}
        {meetingState.success && (
          <p className="success-message">Meeting successfully scheduled!</p>
        )}
      </div>
    </div>
  );
};

export default MeetingScheduler;

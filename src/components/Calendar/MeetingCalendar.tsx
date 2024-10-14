import moment from "moment";
import React, { useState } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import "./MeetingCalendar.css";
import MeetingScheduler from "./MeetingScheduler";
import { IMeeting } from "../../models";
import { RootState } from "../../redux/store";

const localizer = momentLocalizer(moment);

const MeetingCalendar: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<IMeeting | null>(null);
  const meetings = useSelector(
    (state: RootState) => state.meetingScheduler.meetings
  );

  const closePopup = () => setShowPopup(false);

  const eventStyleGetter = (event: Event) => {
    return {
      style: {
        backgroundColor: "#3174ad",
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  const handleSelectEvent = (event: Event & IMeeting) => {
    setSelectedMeeting(event);
  };

  const formatMeetings = meetings.map((meeting) => ({
    ...meeting,
    start: new Date(meeting.meetingStartTime),
    end: new Date(meeting.meetingEndTime),
    title: meeting.meetingTopic,
    users: meeting.users.map((user) => ({ ...user })),
  }));

  return (
    <div className="meeting-calendar-container">
      <div className="calendar-header">
        <h2>Meetings Calendar</h2>
        <button
          onClick={() => setShowPopup(true)}
          className="create-meeting-button"
        >
          Create Meeting
        </button>
      </div>
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={formatMeetings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "600px" }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={closePopup} className="close-popup-button">
              &times;
            </button>
            <MeetingScheduler closePopup={closePopup} />
          </div>
        </div>
      )}
      {selectedMeeting && (
        <div className="meeting-details-overlay">
          <MeetingDetails meeting={selectedMeeting} />
          <button onClick={() => setSelectedMeeting(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

// Move MeetingDetails outside of the main component
const MeetingDetails: React.FC<{ meeting: IMeeting }> = ({ meeting }) => (
  <div className="meeting-details">
    <h4>{meeting.meetingTopic}</h4>
    <p>Room: {meeting.roomName || "Not specified"}</p>
    <p>
      Start: {moment(meeting.meetingStartTime).format("MMMM D, YYYY h:mm A")}
    </p>
    <p>End: {moment(meeting.meetingEndTime).format("MMMM D, YYYY h:mm A")}</p>
    <p>Status: {meeting.status}</p>
    <p>Created: {moment(meeting.creationDate).format("MMMM D, YYYY h:mm A")}</p>
    <p>
      Attendees:{" "}
      {meeting.users
        .map((user) => `${user.firstName} ${user.lastName} (${user.email})`)
        .join(", ")}
    </p>
  </div>
);

export default MeetingCalendar;

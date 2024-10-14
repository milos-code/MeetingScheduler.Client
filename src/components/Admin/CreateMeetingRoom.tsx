import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMeetingRoom } from "../../redux/meetingRoomSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "./CreateMeetingRoom.css";

const CreateMeetingRoom: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.meetingRoom
  );
  const [meetingRoomName, setMeetingRoomName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateRoom = () => {
    if (meetingRoomName.trim()) {
      dispatch(
        createMeetingRoom({ meetingRoom: { roomName: meetingRoomName } })
      )
        .unwrap()
        .then(() => {
          setMeetingRoomName("");
          setSuccessMessage("Meeting room created successfully!");
        })
        .catch(() => {
          setSuccessMessage("");
        });
    }
  };

  return (
    <div className="create-meeting-room-container">
      <h2>Create a New Meeting Room</h2>
      <input
        type="text"
        value={meetingRoomName}
        onChange={(e) => setMeetingRoomName(e.target.value)}
        placeholder="Meeting Room Name"
      />
      <button onClick={handleCreateRoom} disabled={loading}>
        {loading ? "Creating..." : "Create Meeting Room"}
      </button>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreateMeetingRoom;

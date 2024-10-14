import React from "react";
import CreateMeetingRoom from "./CreateMeetingRoom";
import { Avatar, Button } from "@fluentui/react-components";
import { ConferenceRoomRegular, DeleteRegular } from "@fluentui/react-icons";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeetingRoom } from "../../redux/meetingRoomSlice";
import "./MeetingRoomAdministration.css";

const MeetingRoomAdministration: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { meetingRooms } = useSelector((state: RootState) => state.meetingRoom);

  const handleDeleteRoom = (roomId: string) => {
    dispatch(deleteMeetingRoom(roomId))
      .unwrap()
      .then(() => {
        console.log(`Meeting room with ID "${roomId}" deleted successfully`);
      })
      .catch((error) => {
        console.error(
          `Failed to delete meeting room with ID "${roomId}":`,
          error
        );
      });
  };

  return (
    <div className="meeting-room-admin-container">
      <h1>Meeting Rooms Administration</h1>
      <div className="meeting-room-admin-content">
        <div className="create-meeting-room-section">
          <h2>Create Meeting Room</h2>
          <CreateMeetingRoom />
        </div>
        <div className="meeting-rooms-section">
          <h2>Meeting Rooms</h2>
          <ul className="meeting-room-list">
            {meetingRooms.map((room) => (
              <li key={room.id} className="meeting-room-item">
                <Avatar
                  icon={<ConferenceRoomRegular />}
                  shape="square"
                  aria-label="Room"
                  className="room-avatar"
                />
                <span className="room-name">{room.roomName}</span>
                <Button
                  icon={<DeleteRegular />}
                  appearance="subtle"
                  onClick={() => handleDeleteRoom(room.id!)}
                  className="remove-room-button"
                  aria-label={`Remove room ${room.roomName}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomAdministration;

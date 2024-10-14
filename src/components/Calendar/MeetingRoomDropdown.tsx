import React from "react";
import { Dropdown, IDropdownOption, IDropdownStyles } from "@fluentui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./MeetingRoomDropdown.css";

interface MeetingRoomDropdownProps {
  selectedRoomId: string | null;
  onChange: (roomId: string | null) => void;
}

const MeetingRoomDropdown: React.FC<MeetingRoomDropdownProps> = ({
  selectedRoomId,
  onChange,
}) => {
  const { meetingRooms } = useSelector((state: RootState) => state.meetingRoom);

  const dropdownOptions: IDropdownOption[] = meetingRooms.map((room) => ({
    key: room.id!,
    text: room.roomName ?? 'Unnamed Room', // Provide a default value
    data: room,
  }));

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: '100%' },
    title: { border: '1px solid #ccc', borderRadius: '4px' },
    caretDown: { color: '#333' },
  };

  const handleChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    onChange(option ? option.key as string : null);
  };

  const onRenderOption = (option?: IDropdownOption): JSX.Element => {
    if (option) {
      const room = option.data;
      return (
        <div className="room-option">
          <span className="room-name">{room.roomName}</span>
        </div>
      );
    }
    return <></>;
  };

  const onRenderTitle = (options?: IDropdownOption[]): JSX.Element => {
    if (options && options.length > 0) {
      const selectedRoom = options[0].data;
      return (
        <div className="selected-room">
          <span className="room-name">{selectedRoom.roomName}</span>
          <span className="room-capacity">Capacity: {selectedRoom.capacity}</span>
        </div>
      );
    }
    return <span>Select a room</span>;
  };

  return (
    <Dropdown
      placeholder="Select a room"
      options={dropdownOptions}
      selectedKey={selectedRoomId}
      onChange={handleChange}
      styles={dropdownStyles}
      onRenderOption={onRenderOption}
      onRenderTitle={onRenderTitle}
    />
  );
};

export default MeetingRoomDropdown;

export interface IEmployee {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  position?: string;
}

export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: Date;
  position?: string;
  roleNames?: string[];
}

export interface IMeetingRoom {
  id?: string;
  roomName?: string;
}

export interface IMeeting {
  id: string;
  meetingTopic: string;
  roomName: string | null;
  users: IUser[];
  creationDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  status: number;
}
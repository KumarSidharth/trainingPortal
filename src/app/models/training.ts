import { MeetingRoom } from './meetingRoom';

export interface ITraining {
    id: number;
    title: string;
    department: string;
    duration: string;
    time: Date;
    room: MeetingRoom;
    description?: string;
}

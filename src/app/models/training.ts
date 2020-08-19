import { MeetingRoom } from './meetingRoom';
import { Department } from './departments';

export interface ITraining {
    id: number;
    title: string;
    department: Department;
    duration: string;
    time: Date;
    room: MeetingRoom;
    description?: string;
}

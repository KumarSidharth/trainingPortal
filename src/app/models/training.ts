import { MeetingRoom } from './meetingRoom';
import { Department } from './departments';

export class ITraining {
    id: number;
    title: string;
    department: Department;
    duration: string;
    time: Date;
    room: MeetingRoom;
    description?: string;

    constructor({ id, title, department, duration, date, startTime, room, description}) {
        this.id = id;
        this.title = title;
        this.department = department;
        // this.duration = duration
        this.room = room;
        this.description = description;
    }

    createTime(date: Date, time: number) {

    }
}

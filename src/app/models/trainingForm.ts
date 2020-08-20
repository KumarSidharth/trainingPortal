import { Department } from './departments';
import { MeetingRoom } from './meetingRoom';
import { Training } from './training';

export class TrainingForm {
    id: string;
    title: string;
    department: Department;
    duration: string;
    date: string;
    startTime: string;
    room: MeetingRoom;
    description?: string;

    constructor({ id, title, department, duration, time, room, description }: Training) {
        this.id = id ? id.toString() : '';
        this.title = title;
        this.room = room;
        this.department = department;
        this.description = description || '';
        this.duration = duration.toString();
        const { startTime, date } = setDateTime(time);
        this.startTime = startTime;
        this.date = date;
    }
}

function setDateTime(time: Date): {
    startTime: string,
    date: string
} {
    const formatNumber = (n: number): string => n < 10 ?
                                                    '0' + n :
                                                    n.toString();
    const startTime = time.toLocaleTimeString();
    const month = time.getMonth() + 1; // January is 0;
    const date = `${time.getFullYear()}-${formatNumber(month)}-${formatNumber(time.getDate())}`;
    return {
        startTime, date
    };
}

import { MeetingRoom } from './meetingRoom';
import { Department } from './departments';
import { TrainingForm } from './trainingForm';

export class Training {
    id: number;
    title: string;
    department: Department;
    duration: number;
    time: Date;
    room: MeetingRoom;
    description?: string;

    constructor({ id, title, department, duration, date, startTime, room, description}: TrainingForm) {
        this.id = +id;
        this.title = title;
        this.department = department;
        this.time = this.createTime(date, startTime);
        this.duration = +duration;
        this.room = room;
        this.description = description;
    }

    createTime(date: string, startTime: string) {
        /**
         * @TODO check if moment js could have helped
         */
        const hours = startTime.substring(0, 2);
        const minutes = startTime.substring(3, 5);
        let time = new Date(new Date(date).setHours(Number(hours)));
        time = new Date(new Date(time).setMinutes(Number(minutes)));
        time = new Date(new Date(time).setSeconds(0));
        return new Date(new Date(time).setMilliseconds(0));
    }
}

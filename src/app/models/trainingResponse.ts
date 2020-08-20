import { Training } from './training';

export interface ITrainingResonse extends Omit<Training, 'time'> {
    /**
     * String containing UTC date string
     * JSON does not support Date object
     */
    time: string;
}

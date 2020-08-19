import { ITraining } from './training';

export interface ITrainingResonse extends Omit<ITraining, 'time'> {
    /**
     * String containing UTC date string
     * JSON does not support Date object
     */
    time: string;
}

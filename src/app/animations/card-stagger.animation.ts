import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export const CardStagger = trigger('cardStagger', [
    // Transition from any state to any state
    transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('300ms', [
        animate('0.3s ease-in', keyframes([
            style({ opacity: 0, transform: 'scale(0.8)', offset: 0 }),
            style({ opacity: .5, transform: 'scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
        ]))]), { optional: true }),

        // Cards will disappear sequentially with the delay of 300ms
        query(':leave', stagger('300ms', [
        animate('300ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
            style({ opacity: .5, transform: 'scale(1.1)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0.5)', offset: 1 }),
        ]))]), { optional: true })
    ]),
]);

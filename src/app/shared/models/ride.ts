import { User } from './user';

export class Ride{
    id:number;
    departure;
    arrival;
    departureTime;
    arrivalTime;
    velib:boolean;
    luggageRack:boolean;
    user:User;
    dayIds:number[]
}
import { Waypoint } from "../waypoint/waypoint";

export class Route {
    arrival: Date = new Date();
    departure: Waypoint = new Waypoint();
    departureTime: Date = new Date();
    destination: Waypoint = new Waypoint();
    status: string = '';
    systemSymbol: string = '';
    waypointSymbol: string = '';
}
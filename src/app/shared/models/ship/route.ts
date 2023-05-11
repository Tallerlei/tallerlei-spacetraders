import { Waypoint } from "../waypoint/waypoint";

export class Route {
    arrival: string = '';
    departure: Waypoint = new Waypoint();
    departureTime: string = '';
    destination: Waypoint = new Waypoint();
    status: string = '';
    systemSymbol: string = '';
    waypointSymbol: string = '';
}
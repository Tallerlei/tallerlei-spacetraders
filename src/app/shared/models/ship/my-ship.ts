import { Cargo } from "../cargo/cargo";
import { Crew } from "../crew/crew";
import { Engine } from "./engine/engine";
import { Frame } from "./frame/frame";
import { Fuel } from "./fuel";
import { Module } from "./module";
import { Mount } from "./mount";
import { Nav } from "./nav";
import { Reactor } from "./reactor";
import { Registration } from "./registration";
import { ShipBase } from "./ship-base";

export class MyShip extends ShipBase {
    cargo: Cargo = new Cargo();
    crew: Crew = new Crew();
    fuel: Fuel = new Fuel();
    nav: Nav = new Nav();
    registration: Registration = new Registration();
    symbol: string = '';
}
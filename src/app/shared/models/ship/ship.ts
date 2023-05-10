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

export class Ship {
    cargo: Cargo = new Cargo();
    crew: Crew = new Crew();
    engine: Engine = new Engine();
    frame: Frame = new Frame();
    fuel: Fuel = new Fuel();
    modules: Module[] = [];
    mounts: Mount[] = [];
    nav: Nav = new Nav();
    reactor: Reactor = new Reactor();
    registration: Registration = new Registration();
    symbol: string = '';
}
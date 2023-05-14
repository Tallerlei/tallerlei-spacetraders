import { Engine } from "./engine/engine";
import { Frame } from "./frame/frame";
import { Module } from "./module";
import { Mount } from "./mount";
import { Reactor } from "./reactor";

export class ShipBase {
    engine: Engine = new Engine();
    frame: Frame = new Frame();
    modules: Module[] = [];
    mounts: Mount[] = [];
    reactor: Reactor = new Reactor();
}
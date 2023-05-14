import { LeaderBoard } from "./leader-board";
import { Stats } from "./stats";

export class Status {
    leaderBoard: LeaderBoard = new LeaderBoard();
    stats: Stats = new Stats();
    status: string = '';
}
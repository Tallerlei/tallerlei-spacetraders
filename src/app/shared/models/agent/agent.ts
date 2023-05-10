export class Agent {
    data: AgentData = new AgentData();
}
export class AgentData {
    accountId: string = '';
    symbol: string = '';
    headquarters: string = '';
    credits: number = 0;
}
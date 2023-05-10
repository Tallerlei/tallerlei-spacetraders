import { Injectable, Signal, signal } from '@angular/core';
import { Agent } from 'src/app/shared/models/agent/agent';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  agent = signal(new Agent());
  constructor() { }
}
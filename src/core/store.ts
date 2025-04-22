/* eslint-disable */
//@ts-nocheck

import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = 'Updated',
}

export class Store extends EventBus {
  private state: Record<string, unknown> = {}

  constructor(defaultState) {
    if (Store.__instance) {
      return Store.__instance;
    }

    super();
    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Record<string, unknown>) {
    this.state = { ...this.state, ...nextState };
    this.emit(StoreEvents.Updated);
  }
}

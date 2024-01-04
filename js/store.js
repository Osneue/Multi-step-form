/*
 * Author: leo
 * Date: 2024/01/01
 * Description: it acts as model part (manages storage), using MVC pattern
 */

import { ADD_ONS } from './constants.js';

const INITIAL_STATE = {
  currentPage: 0,
  year: false,
  option: 'arcade',
  addOns: [
    { name: ADD_ONS.ONLINE_SERVICE, added: false },
    { name: ADD_ONS.LARGE_STORAGE, added: false },
    { name: ADD_ONS.CUSTOMIZABLE_PROFILE, added: false },
  ],
};

export default class Store {
  state = INITIAL_STATE;

  constructor() {}

  get currentPage() {
    return this.state.currentPage;
  }

  get isYear() {
    return this.state.year;
  }

  get option() {
    return this.state.option;
  }

  get addOnState() {
    return this.state.addOns;
  }

  isAddOnAppended(name) {
    return this.state.addOns.find((addOn) => addOn.name === name).added;
  }

  addAddOns(name) {
    let stateClone = structuredClone(this.#getState());
    const index = stateClone.addOns.findIndex((addOn) => addOn.name === name);
    if (index >= 0) stateClone.addOns[index].added = true;
    this.#setState(stateClone);
  }

  removeAddOns(name) {
    let stateClone = structuredClone(this.#getState());
    const index = stateClone.addOns.findIndex((addOn) => addOn.name === name);
    if (index >= 0) stateClone.addOns[index].added = false;
    this.#setState(stateClone);
  }

  setCurrentPage(page) {
    let stateClone = structuredClone(this.#getState());
    stateClone.currentPage = page;
    this.#setState(stateClone);
  }

  setYear(yesOrNo) {
    let stateClone = structuredClone(this.#getState());
    stateClone.year = yesOrNo;
    this.#setState(stateClone);
  }

  setOption(option) {
    let stateClone = structuredClone(this.#getState());
    stateClone.option = option;
    this.#setState(stateClone);
  }

  #setState(stateOrFn) {
    const prevState = this.#getState();

    let newState;

    switch (typeof stateOrFn) {
      case 'function':
        newState = stateOrFn(prevState);
        break;
      case 'object':
        newState = stateOrFn;
        break;
      default:
        throw new Error('Invalid argument passed to saveState');
    }

    this.state = newState;
  }

  #getState() {
    return this.state;
  }
}

/*
 * Author: leo
 * Date: 2024/01/01
 * Description: it acts as model part (manages storage), using MVC pattern
 */

const INITIAL_STATE = {
  currentPage: 0,
  year: false,
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

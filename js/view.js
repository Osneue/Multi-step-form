/*
 * Author: leo
 * Date: 2024/01/01
 * Description: it manages view, using MVC pattern
 */

export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$$.page = this.#qsAll('[data-id*="page-"]');
    this.$$.nextBtn = this.#qsAll('[data-id="next-btn"]');

    // this.#bindButtons();
  }

  render() {}

  //   #bindButtons() {
  //     this.#bindNextButton();
  //   }

  bindNextButton(handler) {
    this.$$.nextBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        handler();
      });
    });
  }

  switchPage(currentPage, next = true) {
    if (next) {
      this.$$.page[currentPage].classList.remove('activated');
      if (currentPage >= 4) currentPage = 0;
      else currentPage++;
      this.$$.page[currentPage].classList.add('activated');
    }
  }

  #qs(selector, root) {
    const elem = root
      ? root.querySelector(selector)
      : document.querySelector(selector);
    if (!elem) throw new Error(`Cannot find element: ${selector}`);
    return elem;
  }

  #qsAll(selector, root, throwIfEmpty = true) {
    const list = root
      ? root.querySelectorAll(selector)
      : document.querySelectorAll(selector);
    if (list.length === 0 && throwIfEmpty)
      throw new Error(`Cannot find element: ${selector}`);
    return list;
  }
}

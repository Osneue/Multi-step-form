/*
 * Author: leo
 * Date: 2024/01/01
 * Description: it manages view, using MVC pattern
 */

export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.form = this.#qs('[data-id="form"]');
    this.$$.inputs = this.#qsAll('input', this.$.form);
    this.$$.labels = this.#qsAll('label', this.$.form);
    this.$$.pages = this.#qsAll('[data-id*="page-"]');
    this.$$.nextBtns = this.#qsAll('[data-id="next-btn"]');

    // this.#bindButtons();
  }

  render() {}

  //   #bindButtons() {
  //     this.#bindNextButton();
  //   }

  bindNextButton(handler) {
    this.$$.nextBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        handler();
      });
    });
  }

  switchPage(currentPage, next = true) {
    if (currentPage === 0) {
      if (!this.#isValidForm()) return false;
    }
    if (next) {
      this.$$.pages[currentPage].classList.remove('activated');
      if (currentPage >= 4) currentPage = 0;
      else currentPage++;
      this.$$.pages[currentPage].classList.add('activated');
    }
    return true;
  }

  #isValidForm() {
    let isValid = true;
    const emptyError = 'This field is required.';
    const invalidError = [
      'Please input valid name!',
      'Please input valid email!',
      'Please input valid phone!',
    ];

    const isValidName = (input) => {
      return /^[a-z]+[- ]?[a-z]+$/i.test(input.value);
    };
    const isValidEmail = (input) => {
      return /^\w{4,}@[a-z\d]+\.[a-z]{2,}$/i.test(input.value);
    };
    const isValidPhone = (input) => {
      return /^\+?\d{10}$/i.test(input.value);
    };

    this.$$.labels.forEach((label) => {
      label.nextElementSibling.textContent = '';
    });

    this.$$.inputs.forEach((input, index) => {
      input.classList.remove('error');

      if (!isValid) return;

      if (!input.value) {
        isValid = false;
        input.classList.add('error');
        this.$$.labels[index].nextElementSibling.textContent = emptyError;
        return;
      }

      if (index === 0) isValid &= isValidName(input);

      if (index === 1) isValid &= isValidEmail(input);

      if (index === 2) isValid &= isValidPhone(input);

      if (!isValid) {
        input.classList.add('error');
        this.$$.labels[index].nextElementSibling.textContent =
          invalidError[index];
      }

      //   console.log(isValid);
    });

    return isValid;
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

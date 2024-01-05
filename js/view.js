/*
 * Author: leo
 * Date: 2024/01/01
 * Description: it manages view, using MVC pattern
 */

import { ADD_ONS, ADD_ON_PRICE, OPTIONS, OPTIONS_PRICE } from './constants.js';

export default class View {
  $ = {};
  $$ = {};
  addOns = [ADD_ONS[0], ADD_ONS[1], ADD_ONS[2]];
  changeHandler = null;

  constructor() {
    this.$.p1Form = this.#qs('.p1-form');
    this.$.p2CheckBox = this.#qs('#year-check');
    this.$.priceTemplate = this.#qs('[data-id="price-template"]');
    this.$$.circles = this.#qsAll('.circle');
    this.$$.p1Inputs = this.#qsAll('input', this.$.p1Form);
    this.$$.p1Labels = this.#qsAll('label', this.$.p1Form);
    this.$$.pages = this.#qsAll('[class*="page-"]');
    this.$$.plans = this.#qsAll('.plan');
    this.$$.privileges = this.#qsAll('.privilege');
    this.$$.addOns = this.#qsAll('.add-on-container');
    this.$$.nextBtns = this.#qsAll('[data-id="next-btn"]');
    this.$$.prevBtns = this.#qsAll('[data-id="prev-btn"]');
  }

  render({ currentPage, nextPage, isYear, option, addOnState }) {
    this.#renderMonthOrYear(isYear);
    this.#renderOption(option);
    this.#renderAddOn(addOnState, isYear);
    this.#renderPage4(isYear, option, addOnState);
    this.#switchPage(currentPage, nextPage);
  }

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

  bindPrevButton(handler) {
    this.$$.prevBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        handler();
      });
    });
  }

  bindYearCheckBox(handler) {
    this.$.p2CheckBox.addEventListener('change', () => {
      //   console.log(this.$.p2CheckBox.checked);
      handler(this.$.p2CheckBox.checked);
    });
  }

  bindPlans(handler) {
    this.$$.plans.forEach((plan, index) => {
      plan.addEventListener('click', () => {
        // console.log('plan clicked');
        handler(OPTIONS[index]);
      });
    });
  }

  bindAddOns(handler) {
    this.$$.addOns.forEach((addOn, index) => {
      addOn.addEventListener('click', () => {
        // console.log('add-ons clicked');
        handler(this.addOns[index]);
      });
    });
  }

  bindChangeLink(handler) {
    this.changeHandler = handler;
  }

  isValidForm() {
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

    this.$$.p1Labels.forEach((label) => {
      label.nextElementSibling.textContent = '';
    });

    this.$$.p1Inputs.forEach((input, index) => {
      input.classList.remove('error');

      if (!isValid) return;

      if (!input.value) {
        isValid = false;
        input.classList.add('error');
        this.$$.p1Labels[index].nextElementSibling.textContent = emptyError;
        return;
      }

      if (index === 0) isValid &= isValidName(input);

      if (index === 1) isValid &= isValidEmail(input);

      if (index === 2) isValid &= isValidPhone(input);

      if (!isValid) {
        input.classList.add('error');
        this.$$.p1Labels[index].nextElementSibling.textContent =
          invalidError[index];
      }

      //   console.log(isValid);
    });

    return isValid;
  }

  #switchPage(currentPage, nextPage) {
    if (currentPage === nextPage) return;
    this.$$.pages[currentPage].classList.remove('activated');
    this.$$.circles[currentPage].classList.remove('activated');
    this.$$.pages[nextPage].classList.add('activated');
    this.$$.circles[Math.min(nextPage, 3)].classList.add('activated');
    // if (next) {
    //   if (currentPage >= 4) return false;
    //   this.$$.pages[currentPage].classList.remove('activated');
    //   this.$$.circles[currentPage].classList.remove('activated');
    //   currentPage++;
    //   this.$$.pages[currentPage].classList.add('activated');
    //   this.$$.circles[currentPage].classList.add('activated');
    // } else {
    //   if (currentPage === 0) return false;
    //   this.$$.pages[currentPage].classList.remove('activated');
    //   this.$$.circles[currentPage].classList.remove('activated');
    //   currentPage--;
    //   this.$$.pages[currentPage].classList.add('activated');
    //   this.$$.circles[currentPage].classList.add('activated');
    // }
    return true;
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

  #renderMonthOrYear(isYear) {
    if (isYear) {
      this.$.p2CheckBox.checked = true;
      this.$$.privileges.forEach((privilege) => {
        privilege.classList.add('activated');
      });
    } else {
      this.$.p2CheckBox.checked = false;
      this.$$.privileges.forEach((privilege) => {
        privilege.classList.remove('activated');
      });
    }
  }

  #renderOption(targetOption) {
    OPTIONS.forEach((option, index) => {
      if (option === targetOption) {
        this.$$.plans[index].classList.add('activated');
      } else {
        this.$$.plans[index].classList.remove('activated');
      }
    });
  }

  #renderAddOn(states, isYear) {
    const monthPrices = [1, 2, 2];

    if (isYear) {
      this.$$.addOns.forEach((addOn, index) => {
        const priceNode = addOn.children[1];
        let price = monthPrices[index] * 10;
        const newContent = `$${price}/yr`;
        priceNode.textContent = newContent;
      });
    } else {
      this.$$.addOns.forEach((addOn, index) => {
        const priceNode = addOn.children[1];
        let price = monthPrices[index];
        const newContent = `$${price}/mo`;
        priceNode.textContent = newContent;
      });
    }

    states.forEach((state) => {
      const index = this.addOns.findIndex((addOn) => addOn === state.name);
      if (index >= 0) {
        if (state.added) {
          this.$$.addOns[index].classList.add('activated');
        } else {
          this.$$.addOns[index].classList.remove('activated');
        }
      }
    });
  }

  #renderPage4(isYear, option, addOnState) {
    let priceSum = 0;

    const captalise = (str) => {
      return str[0].toUpperCase() + str.slice(1);
    };

    const renderOption = () => {
      const index = OPTIONS_PRICE.findIndex((opt) => opt.name === option);
      if (index < 0) return;

      pricePlan.children[0].textContent = `${captalise(
        OPTIONS_PRICE[index].name
      )}${isYear ? '(Yearly)' : '(Monthly)'}`;
      let price = OPTIONS_PRICE[index].price;
      if (isYear) price *= 10;
      priceSum += price;
      pricePlan.children[2].textContent = `$${price}/${isYear ? 'yr' : 'mo'}`;
    };

    const renderAddOns = () => {
      const renderAddOn = (state) => {
        let price = ADD_ON_PRICE.find((item) => item.name === state.name).price;
        if (isYear) price *= 10;
        priceSum += price;
        const elem = this.#html2Element(`
          <div class="price-detail-add-on">
            <p>${captalise(state.name)}</p>
            <p>+$${price}/${isYear ? 'yr' : 'mo'}</p>
          </div>
        `);
        return elem;
      };
      addOnState.forEach((state) => {
        if (!state.added) return;
        const elem = renderAddOn(state);
        priceAddOn.appendChild(elem);
      });
    };

    const renderPriceTotal = () => {
      priceTotal.children[0].textContent = `Total (per ${
        isYear ? 'year' : 'month'
      })`;
      priceTotal.children[1].textContent = `+$${priceSum}/${
        isYear ? 'yr' : 'mo'
      }`;
    };

    const renderTemplate = () => {
      while (this.$$.pages[3].children[1].firstChild) {
        this.$$.pages[3].children[1].removeChild(
          this.$$.pages[3].children[1].firstChild
        );
      }
      this.$$.pages[3].children[1].appendChild(template);
    };

    const bindChangeLink = (handler) => {
      const changeLink = this.#qs('.price-detail-plan a');
      changeLink.addEventListener('click', () => {
        this.changeHandler();
      });
    };

    const template = document.importNode(this.$.priceTemplate.content, true);
    const pricePlan = this.#qs('.price-detail-plan', template);
    const priceAddOn = this.#qs('.price-detail-add-on-container', template);
    const priceTotal = this.#qs('.price-total', template);

    renderOption();
    renderAddOns();
    renderPriceTotal();
    renderTemplate();
    bindChangeLink();
  }

  #html2Element(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    // console.log(template.content);
    return template.content.firstElementChild;
  }
}

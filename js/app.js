/*
 * Author: leo
 * Date: 2024/01/01
 * Description: it's the entry file, acts as a controller, using MVC pattern
 */

import Store from './store.js';
import View from './view.js';

function initApp() {
  //   console.log('initApp');

  const view = new View();
  const store = new Store();

  view.bindNextButton(() => {
    // console.log('next button clicked');
    let currentPage = store.currentPage;
    let nextPage = currentPage + 1;
    if (currentPage === 0) {
      if (!view.isValidForm()) return;
    }
    store.setCurrentPage(nextPage);
    view.render({
      currentPage,
      nextPage,
      isYear: store.isYear,
      option: store.option,
      addOnState: store.addOnState,
    });
  });

  view.bindPrevButton(() => {
    // console.log('prev button clicked');
    let currentPage = store.currentPage;
    let nextPage = currentPage - 1;
    store.setCurrentPage(nextPage);
    view.render({
      currentPage,
      nextPage,
      isYear: store.isYear,
      option: store.option,
      addOnState: store.addOnState,
    });
  });

  view.bindYearCheckBox((isYear) => {
    store.setYear(isYear);
    view.render({
      currentPage: store.currentPage,
      nextPage: store.currentPage,
      isYear: store.isYear,
      option: store.option,
      addOnState: store.addOnState,
    });
  });

  view.bindPlans((option) => {
    store.setOption(option);
    view.render({
      currentPage: store.currentPage,
      nextPage: store.currentPage,
      isYear: store.isYear,
      option: store.option,
      addOnState: store.addOnState,
    });
  });

  view.bindAddOns((addOn) => {
    const isAdded = store.isAddOnAppended(addOn);
    if (isAdded) store.removeAddOns(addOn);
    else store.addAddOns(addOn);
    view.render({
      currentPage: store.currentPage,
      nextPage: store.currentPage,
      isYear: store.isYear,
      option: store.option,
      addOnState: store.addOnState,
    });
  });

  view.bindChangeLink(() => {
    let currentPage = store.currentPage;
    let nextPage = 1;
    store.setCurrentPage(nextPage);
    view.render({
      currentPage,
      nextPage,
      isYear: store.isYear,
      option: store.option,
      addOnState: store.addOnState,
    });
  });

  view.render({
    currentPage: store.currentPage,
    nextPage: store.currentPage,
    isYear: store.isYear,
    option: store.option,
    addOnState: store.addOnState,
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});

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
    if (!view.switchPage(currentPage, true)) return;
    currentPage++;
    store.setCurrentPage(currentPage);
  });

  //   view.render();
}

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});

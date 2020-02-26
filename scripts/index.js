import {handleBookmarkList, render} from './app.js';
import api from './api.js';
import {addBookmark} from './store.js';



const main = function () {
  api.getItems()
    .then((items) => {
      items.forEach((item) => addBookmark(item));
      render();
    });
      
  handleBookmarkList();
  render();
};


$(main);
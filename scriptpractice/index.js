import store from './store.js';
import bookmarks from './bookmark.js';
import api from './api.js';

/******* Main App Start *******/
const handleBookmarkList = function(){
  render();
  handleAddNewItemBtn();
  handleCancelBtn();
  handleNewBookCreate();
  handleExpandedView();
  handleFilterRatings();
  handleDeleteBookmark();
};

// when the page loads, call `handleBookmarkList`
$(handleBookmarkList);

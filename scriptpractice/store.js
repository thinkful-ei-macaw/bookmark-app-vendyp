import bookmarks from './bookmark.js';

const store = {
  bookmarks: [
    {
      id: cuid(),
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: cuid(),
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  
  adding: false,
  error: null,
  filter: 0,
  starRating: {
    '*': 1,
    '**': 2,
    '***': 3,
    '****': 4,
    '*****': 5
  }
};

///add item to bookmark list
const addItemToBookmarkList = function (bookmarkName, ratingNum, urlName, descriptionDetails) {
  store.bookmarks.push({ id: cuid(), title: bookmarkName, rating: ratingNum, url: urlName, description: descriptionDetails, expanded: false });
};

const deleteBookmarkItem = function (bookID) {
  console.log(`Deleting with ${bookID}`);
  const index = store.bookmarks.findIndex(item => item.id === bookID);
  store.bookmarks.splice(index, 1);
};

export default {
  store,
  addItemToBookmarkList,
  deleteBookmarkItem
};
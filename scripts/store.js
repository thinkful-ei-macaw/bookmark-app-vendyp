import {render} from './app.js';

const store = {
  bookmarks: [],  
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

//user adding a new item true or false 
const isUserAdding = function(){
  return store.adding;
};

//give rating based on user selection
const filterBookmarks = function(){
  return store.bookmarks.filter(book=>book.rating >= store.filter);

  //fetch
  //addbookmarks to the store
  //filter
  //render
};


const addBookmark = function(bookmark){
  return store.bookmarks.push(bookmark);

  // return store.bookmarks.push({ id: cuid(), title: bookmarkName, rating: ratingNum, url: urlName, description: descriptionDetails, expanded: false });
};
//set if user is adding
const addIsTrue = function(){
  store.adding = true;
};
const addNotTrue = function(){
  store.adding = false;
};
const setExpanded = function(bookID){
  for(let i = 0; i < store.bookmarks.length; i++){
    if(store.bookmarks[i].id === bookID){
      store.bookmarks[i].expanded = !store.bookmarks[i].expanded;
    }
  }
};

const deleteBookmark = function(bookID){

  fetch('https://thinkful-list-api.herokuapp.com/vprum/bookmarks/' + bookID+ '/', {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => {
      const index = store.bookmarks.findIndex(item => item.id === bookID);
      store.bookmarks.splice(index, 1);
      render();
    })
    .catch(err => console.error(err.message));
  
};
const setRatings = function(chosenRating){
  store.filter = store.starRating[chosenRating];
};

export {
  store,
  isUserAdding,
  filterBookmarks,
  addBookmark,
  addIsTrue,
  addNotTrue,
  setExpanded,
  deleteBookmark,
  setRatings
};

import api from './api.js';

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
};


const addBookmark = function(bookmark){
  return store.bookmarks.push(bookmark);
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
  api.deleteSelected(bookID);
  
};
const setRatings = function(chosenRating){
  store.filter = store.starRating[chosenRating];
};

const setError = function(error){
  store.error = error;
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
  setRatings,
  setError
};

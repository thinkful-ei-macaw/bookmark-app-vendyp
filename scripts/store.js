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

//user adding a new item true or false 
const isUserAdding = function(){
  return store.adding;
};
//give rating based on user selection
const filterBookmarks = function(){
  return store.bookmarks.filter(book=>book.rating >= store.filter);
};

const addBookmark = function(bookmarkName, ratingNum, urlName, descriptionDetails){
  return store.bookmarks.push({ id: cuid(), title: bookmarkName, rating: ratingNum, url: urlName, description: descriptionDetails, expanded: false });
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
  const index = store.bookmarks.findIndex(item => item.id === bookID);
  store.bookmarks.splice(index, 1);
};
const setRatings = function(chosenRating){
  store.filter = store.starRating[chosenRating];
};

export {
  isUserAdding,
  filterBookmarks,
  addBookmark,
  addIsTrue,
  addNotTrue,
  setExpanded,
  deleteBookmark,
  setRatings
};

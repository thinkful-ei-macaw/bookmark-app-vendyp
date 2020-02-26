import store from './store.js';
import api from './api.js';

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates 
//bookmark is object...does not know what store object is!
const generateInitialView = function(bookmark){
  return ` <h1>My Bookmarks</h1>
  <section class="top-view top-buttons">
          ${generateTopButtons()}
  </section>
  <section class="top-view">
    <div class="container">
      <ul id="title-list">
      ${generateBookmarkItems(bookmark)}
      </ul> 
    </div>
  </section> `;
};

const generateTopButtons = function(){
  return `<div class="button-inline">
    <button class="dropbtn leftbtn newBtn">
    + New <i class="icon-bookmark"></i>
    </button>
  </div>
  <div class="dropdown button-inline">
    <button class="dropbtn js-filter-drop">
    Filter By: <i class="icon-caret-down"></i>
    </button>
    <div class="dropdown-content">
    <a href="#">*****</a>
    <a href="#">****</a>
    <a href="#">***</a>
    <a href="#">**</a>
    <a href="#">*</a>
    </div>
  </div>`;
};

const generateBookmarkList = function(bookmark){
  // console.log(bookmark);
  return `          <li data-id=${bookmark.id}>
  <div class="space-between padding-element">
      <p>${bookmark.title}</p>
      <div class="align-stars"> 
        ${generateStarRating(bookmark.rating)}
      </div>
  </div>
  <div>
  </div>
</li>`;
};
const generateFilledStars = function(){
  return '<i class="icon-star"></i>';
};

const generateUnfilledStars = function(){
  return '<i class="icon-star-empty"></i>';
};

const generateExpandedView = function(bookmark){
  return `<li data-id=${bookmark.id}>
    <div class="space-between padding-element">
    <p>${bookmark.title}</p>
    <p><i class="icon-trash"></i></p>
    </div>

    <div class="flex-center">
        <form action="${bookmark.url}">
            <input class="visit-site" type="submit" value="Visit Site"/>
        </form>        
    </div>
    <div class="padding-element">
        <p>
            ${bookmark.description}
        </p>
    </div> 
    </li>`;
};

const generateCreatePage = function(){
  return `    <h1>My Bookmarks</h1>
  <section class="align-together">
  <div class="sizing">
      <form class="add-page">
          <label for="add-new-bookmark">Add new bookmark:</label><br>
          <input type="url" id="url-link" name="url-link" placeholder="Link here" required><br>
      </form>  
      <div class="block">
        <div class ="align-icon align-center">
        <label for="add-title">Title:</label>
        <input type="text" id="add-title" name="add-title" placeholder="Add title here"><br><i class="icon-pencil"></i>
        </div>
        <div class="choose-star flex-center">                
          <input type="number" name="number-rating" id="number-rating" placeholder="1-5 rating">
        </div>
        <div class="flex-center">
          <label for="book-description"></label>
          <textarea class="book-description" rows="4" cols="50">
            Add a description. (optional)
          </textarea>
        </div>
      </div> 
      <div class="btn-padding align-evenly">
        <button id="cancel-btn">cancel</button>
        <button id="create-btn">create</button>
      </div>
  </div>
</section>`;
};

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
const render = function(){
  if(store.adding === false){
    $('main').html(generateInitialView);
  } else{
    $('main').html(generateCreatePage);
  }

  //function call event listeners here
  //handleExpandedView();

};





/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
//get all bookmarks from store object and expand the view
const generateBookmarkItems = function(){
 

  const items = store.bookmarks.filter(book=>book.rating >= store.filter).map((item) => {
    if(item.expanded === true){
      return generateExpandedView(item);
    } else{
      return generateBookmarkList(item);
    }  
  });


  return items.join('');
};

//generate star rating
const generateStarRating = function(ratingNum){
  let starString = generateFilledStars();

  for(let i = 1; i < 5; i++){
    if(ratingNum > i){
      starString += generateFilledStars();
    } else{
      starString += generateUnfilledStars();
    }
  }
 
  return starString;
};



const handleNewBookCreate = function () {
  $('main').on('click', '#create-btn', function (event) {
    event.preventDefault();
    const urlName = $('#url-link').val();
    const titleName = $('#add-title').val();
    const bookRating= $('#number-rating').val();
    const bookDescription = $('.book-description').val();
    if(urlName === '' || titleName === '' || bookRating === '' ||bookDescription === ''){
      throw new Error('Please fill out the fields with appropriate ');
    }
    addItemToBookmarkList(titleName, bookRating, urlName, bookDescription);
    store.adding = false;
    render();
  });
};

//listen for click to add new items and update the store 
const handleAddNewItemBtn = function(){
  $('main').on('click', '.newBtn', function(){
    store.adding = true;
    render();
  });
};
//listen for click for cancel btn
const handleCancelBtn = function(){
  $('main').on('click', '#cancel-btn', function(e){
    e.preventDefault();
    store.adding = false;
    render();
  });
};

const handleExpandedView = function(){
  $('main').on('click', 'li', function(){
    const bookID = $(this).attr('data-id');
    console.log(bookID);
    for(let i = 0; i < store.bookmarks.length; i++){
      if(store.bookmarks[i].id === bookID){
        store.bookmarks[i].expanded = !store.bookmarks[i].expanded;
      }
    }
    render();
  });
};


const handleDeleteBookmark = function(){
  //only delete when in the expanded view

  $('main').on('click', '.icon-trash', function(){
    const bookID = $(this).closest('li').attr('data-id');
    deleteBookmarkItem(bookID);
    render();
  });
  
};

//actual logic for filtering ratings
const handleFilterRatings = function(){
  $('main').on('click', 'a', function(){
    const chosenRating = $(this).text();
    store.filter = store.starRating[chosenRating];
    render();
  });
};


export default{
  handleFilterRatings,
  handleDeleteBookmark,
  handleExpandedView,
  handleCancelBtn,
  handleAddNewItemBtn,
  handleNewBookCreate,
  generateStarRating,
  generateBookmarkItems,
  render,
  generateCreatePage,
  generateExpandedView,
  generateFilledStars,
  generateUnfilledStars,
  generateBookmarkList,
  generateTopButtons,
  generateInitialView
}
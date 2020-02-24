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
  filter: 0
};

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
    <button class="dropbtn">
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
  return `          <li>
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
  return `<li>
    <div class="space-between border-bottom padding-element">
    <p>${bookmark.title}</p>
    <p><i class="icon-trash"></i></p>
    </div>

    <div class="flex-center">
        <form action="${bookmark.url}">
            <input class="visit-site" type="submit" value="Visit Site"/>
        </form>        
    </div>
    <div class="border-bottom padding-element">
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
          <input type="text" id="url-link" name="url-link" placeholder="Link here"><br>
      </form>  
      <div class="block">
        <div class ="align-icon align-center">
        <label for="add-title">Title:</label>
        <input type="text" id="add-title" name="add-title" placeholder="Add title here"><br><i class="icon-pencil"></i>
        </div>
        <div class="choose-star flex-center">                
          <input type="number" name="numberRating" placeholder="1-5 rating">
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

};





/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
//get all bookmarks from store object
const generateBookmarkItems = function(){
  const items = store.bookmarks.map((item) => generateBookmarkList(item));
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


///add item to bookmark list
const addItemToBookmarkList = function (bookmarkName, ratingNum, urlName, descriptionDetails) {
  store.bookmarks.push({ id: cuid(), title: bookmarkName, rating: ratingNum, url: urlName, description: descriptionDetails, expanded: false });
};


const handleNewBookCreate = function () {
  $('main').on('submit', '#create-btn', function (event) {
    event.preventDefault();
    const newItemName = $('#url-link').val();
    // $('.js-shopping-list-entry').val('');
    // addItemToBookmarkList(newItemName);
    // render();
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


/******* Main App Start *******/
const handleBookmarkList = function(){
  render();
  //function call event listeners here
  handleAddNewItemBtn();
  handleCancelBtn();
};

// when the page loads, call `handleBookmarkList`
$(handleBookmarkList);




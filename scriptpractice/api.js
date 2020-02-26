import bookmark from './bookmark.js';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/vprum/bookmarks';


// Key	Value
// title	string, required Min 1 length
// url	string, required Min 5 length. Include protocol (http/https).
// desc	string, optional Min 1 length
// rating	number, optional Between 1 and 5

const bookmarkData = JSON.stringify({
  title: 'Because I\'m Batman',
  url: 'http://www.google.com',
  description: 'No one will ever guess my secret identity. Haha!',
  rating: 1
});



fetch(BASE_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: bookmarkData
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err.message));


fetch(BASE_URL)
  .then(response => response.json())
  .then(parseJson=>{
    console.log(parseJson); //parseJson -- replaces items in bookmark
  })
  .catch(err =>console.error(err));
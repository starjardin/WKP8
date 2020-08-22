/*
Plan: 
1- Make an array of objects(collection)
2-Make a function that generates the list of songs
3-Grab the form element and add event listener to it to submit the songs
4-Make a function that sorts the list from the most popular to the lest popular
5-Make a function that handles the update
6-Make a function that delete the list
7-Grab the inputs for the search and listen for type input
8-compare the value of the input to the title and the style
9- Listen for a click to the reset button and clear the filter inputs and the list must go back to where it was.
10- Add the lists to the local storage.
*/

//State mama array
let songs = [];

//Fundamenal elements
const formEl = document.querySelector('.form-submit');
const tableBody = document.querySelector('.tbody');
const filterByName = document.querySelector('[name="searchName"]');
const filterByStyle = document.querySelector('[name="searchStyle"]');
const reset = document.querySelector('.reset');
const searchs = document.querySelectorAll(".search");

//function to show the list of the songs
const songsLists = () => {
  //map the mama array to create html for each object
  const html = songs.map(song => 
  `<tr>
    <td>
      <img src="${song.picuture}" alt="artist's image">
    </td>
    <td>
      <span>Song's name:</span>
      <span>${song.style}</span>
    </td>
    <td>
      <span>Artist name:</span>
      <span>${song.name}</span>
    </td>
    <td>
      <span>Score:</span>
      <span>${song.score}</span>
    </td>
    <td>
      <button type="button" value="${song.id}" class="update">+1</button>
    </td>
    <td>
      <button type="button" value="${song.id}" class="delete">Delete</button>
    </td>
  </tr>`).join('');
  tableBody.innerHTML = html;
};

//This function takes values of the inputs form the users and output it.
const generatesListsOfSongs = (e) => {
  e.preventDefault();
  //e.target is the form itself,
  const form = e.currentTarget;
  //Here we create a new object
  const newSongs = {
    title: form.title.value,
    name: form.name.value,
    style: form.style.value,
    length: form.length.value,
    picuture: form.picture.value,
    score: 0,
    id: Date.now(),
  };
  //Push the new object to the mama array
  songs.push(newSongs);
  //Reset the form here to stay clean
  form.reset();
  //This is a custom event that will be fired whenever it is needed.
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

//Function to delete songs
const deleteSongs = (id) => {
  //Filter the the songs array and only take the ones which have differend id to the item gets clicked.
  songs = songs.filter(song => song.id !== id);
  //Cutom event will launch after this filter, to create news lists.
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

//Fuction to update scores
const updateSocres = (id) => {
  //Find the songs which has the same id to the item gets clicked and incriment its score by one each click
  let updatedSong = songs.find(song => song.id === id);
  updatedSong.score++;
  //Sort the score of the items form the bigger to the smaller,
  songs.sort((a,b) => {
    return b.score - a.score;
  });
  //Custom event that will launch after this filter and create a new list depends on the sorted results.
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

//listen for inputs and take the value and compare to the litle of lists of the songs
filterByName.addEventListener("input", (e) => {
  //My trick here is to find the similar words usong the includes() method and create a new html from that result.
  const textSearched = e.target.value.toLocaleLowerCase();
  let songsFilteredByTitle = songs.filter(song => song.title.toLocaleLowerCase().includes(textSearched));
  //Here is the html for the filtered lists
  const html = songsFilteredByTitle.map(song => 
  `<tr>
    <td>
      <img src="${song.picuture}" alt="artist's image">
    </td>
    <td>
      <span>Song's name:</span>
      <span>${song.style}</span>
    </td>
    <td>
      <span>Artist name:</span>
      <span>${song.name}</span>
    </td>
    <td>
      <span>Score:</span>
      <span>${song.score}</span>
    </td>
    <td>
      <button type="button" value="${song.id}" class="update">+1</button>
    </td>
    <td>
      <button type="button" value="${song.id}" class="delete">Delete</button>
    </td>
  </tr>`).join('');
  tableBody.innerHTML = html;
});

//listen for inputs and take the value and compare to the style of lists of the songs
filterByStyle.addEventListener("input", e => {
  //Pretty similar to the first one, they should be done in one functon but I was fint here. I did the last idea was this.
  const textSearched = e.target.value.toLocaleLowerCase();
  let songsFilteredByStyle = songs.filter(song => song.style.toLocaleLowerCase().includes(textSearched));
  const html = songsFilteredByStyle.map(song => 
  `<tr>
    <td>
      <img src="${song.picuture}" alt="artist's image">
    </td>
    <td>
      <span>Song's name:</span>
      <span>${song.style}</span>
    </td>
    <td>
      <span>Artist name:</span>
      <span>${song.name}</span>
    </td>
    <td>
      <span>Score:</span>
      <span>${song.score}</span>
    </td>
    <td>
      <button type="button" value="${song.id}" class="update">+1</button>
    </td>
    <td>
      <button type="button" value="${song.id}" class="delete">Delete</button>
    </td>
  </tr>`).join('');
  tableBody.innerHTML = html;
});

//reset the search inputs
const resetFunction = (e) => {
  //Here is to clear the filter inputs field
  filterByName.value = '',
  filterByStyle.value = '',
  //the list goes back to the normal state here after clicking the reset button
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

const initToLocalStorage = () => {
  //Here is adding the object to the locl storage and change into stirings because local storage only works with strings
  localStorage.setItem('songs', JSON.stringify(songs));
};

const restoreFromLocalStorage = () => {
  //Take the items from the local storage and change them back to actual object.
  const listOfSongs = JSON.parse(localStorage.getItem('songs'));
  if (listOfSongs.length) {
    songs.push(...listOfSongs);
  }
  //Create list of items from the local storage
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
}

//Here the listeners events
formEl.addEventListener("submit", generatesListsOfSongs);
reset.addEventListener("click", resetFunction);
tableBody.addEventListener("click", (e) => {
  const id = Number(e.target.value);
  if (e.target.matches(".delete")) {
    deleteSongs(id);
  }
});
tableBody.addEventListener("click", (e) => {
  const id = Number(e.target.value);
  if (e.target.matches('.update')) {
   updateSocres(id);
  }
})
tableBody.addEventListener('listsSongsUpdated', songsLists);
tableBody.addEventListener('listsSongsUpdated', initToLocalStorage);
restoreFromLocalStorage();

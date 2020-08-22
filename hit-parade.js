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
*/

let songs = [];

const formEl = document.querySelector('.form-submit');
const tableBody = document.querySelector('.tbody');
const filterByName = document.querySelector('[name="searchName"]');
const filterByStyle = document.querySelector('[name="searchStyle"]');
const reset = document.querySelector('.reset');
const searchs = document.querySelectorAll(".search");

//function to show the list of the songs
const songsLists = () => {
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
  const form = e.currentTarget;
  const newSongs = {
    title: form.title.value,
    name: form.name.value,
    style: form.style.value,
    length: form.length.value,
    picuture: form.picture.value,
    score: 0,
    id: Date.now(),
  };
  songs.push(newSongs);
  form.reset();
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

//Function to delete songs
const deleteSongs = (id) => {
  songs = songs.filter(song => song.id !== id);
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

//Fuction to update scores
const updateSocres = (id) => {
  let updatedSong = songs.find(song => song.id === id);
  updatedSong.score++;

  songs.sort((a,b) => {
    return b.score - a.score;
  });
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

//listen for inputs and take the value and compare to the litle of lists of the songs
filterByName.addEventListener("input", (e) => {
  const textSearched = e.target.value.toLocaleLowerCase();
  let songsFilteredByTitle = songs.filter(song => song.title.toLocaleLowerCase().includes(textSearched));
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
  filterByName.value = '',
  filterByStyle.value = '',
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

const initToLocalStorage = () => {
  localStorage.setItem('songs', JSON.stringify(songs));
};

const restoreFromLocalStorage = () => {
  const listOfSongs = JSON.parse(localStorage.getItem('songs'));
  if (listOfSongs.length) {
    songs.push(...listOfSongs);
  }
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

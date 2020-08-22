/*
Plan: 
1- Make an array of objects(collection)
2-Make a function that generates the list of songs
3-Grab the form element and add event listener to it to submit the songs
4-Make a function that sorts the list from the most popular to the lest popular
5-Make a function that handles the update
6-Make a function that delete the list
*/

let songs = [
  {
    title: "Perfect",
    name: "Ed Sheeran",
    style: "Pop",
    length: "4:04",
    picuture: "ed-sheeran.jpg",
    score: 0,
    id: 1598075378858,
  },
  {
    title: "The storm is over",
    name: "Kelly",
    style: "R&B",
    length: "4:34",
    picuture: "storm.jpg",
    score: 0,
    id: 1598075381095,
  },
  {
    title: "There is no excuse my friend",
    name: "Michael Learns",
    style: "rock",
    length: "3:34",
    picuture: "heart.png",
    score: 0,
    id: 1598075616397,
  },
];

const formEl = document.querySelector('.form-submit');
const tableBody = document.querySelector('.tbody');
const filterByName = document.querySelector('[name="searchName"]');
const filterByStyle = document.querySelector('[name="searchStyle"]');
const reset = document.querySelector('.reset');

const songsLists = () => {
  const html = songs.map(song => 
  `<tr>
    <td>
      <img src="${song.picuture}" alt="artist's image" width="5rem" height="5rem">
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
}

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
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

const filterList = () => {
  const filteredByName = songs.filter(song => song.title.value);
  console.log(filteredByName);
};

const deleteSongs = (id) => {
  songs = songs.filter(song => song.id !== id);
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};

const updateSocres = (id) => {
  let updatedSong = songs.find(song => song.id === id);
  updatedSong.score++;

  songs.sort((a,b) => {
    return b.score - a.score;
  });
  tableBody.dispatchEvent(new CustomEvent('listsSongsUpdated'));
};


formEl.addEventListener("submit", generatesListsOfSongs);
// tableBody.addEventListener('');
reset.addEventListener("click", filterList);
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

tableBody.addEventListener('listsSongsUpdated', songsLists)
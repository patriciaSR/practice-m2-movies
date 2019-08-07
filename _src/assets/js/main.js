'use strict';

// Cuando el fichero se ejecuta...

// Defino mis variables que necesito siempre...
const inputMovie = document.querySelector('.finder__input');
const btnFinder = document.querySelector('.finder__btn');
const resultList = document.querySelector('.result__list');
const favouriteList = document.querySelector('.favourites__list');
const ENDPOINT = 'http://api.tvmaze.com/search/shows?q=';
let favs = [];

// Ejecuto lo que me interesa al iniciar la página...
btnFinder.addEventListener('click', getMovies);
loadFavourites();

// Defino mis funciones que hacen funcionar la app...
function getMovies() {
  const movieName = inputMovie.value;

  fetch(ENDPOINT + movieName)
    .then(response => response.json())
    .then(data => {
      for (const item of data) {
        const film = {
          id: item.show.id,
          title: item.show.name,
          image: item.show.image.medium
        };

        const filmElement = createFilm(film, false);

        resultList.appendChild(filmElement);
      }
    });
}

function createFilm(film, isFavourite){
  const li = document.createElement('li');
  const img = document.createElement('img');
  const h2 = document.createElement('h2');
  const icon = document.createElement('i');

  li.id = film.id;
  li.classList.add('movie__item');
  if (isFavourite) {
    li.classList.add('small');
  }

  img.classList.add('movie__image');
  img.alt = film.title;
  img.src = film.image;

  h2.classList.add('movie__title');
  h2.innerText = film.title;

  li.appendChild(img);
  li.appendChild(h2);

  if (isFavourite) {
    icon.classList.add('fas', 'fa-times-circle');
    icon.addEventListener('click', () => {
      removeFavourite(film, li);
    });
    li.appendChild(icon);
  } else {
    li.addEventListener('click', addFavourite);
  }

  return li;
}

function loadFavourites() {
  const lsFavs = localStorage.getItem('movies');

  if (lsFavs) {
    favs = JSON.parse(lsFavs);

    for (const film of favs) {
      const filmElement = createFilm(film, true);

      favouriteList.appendChild(filmElement);
    }
  }
}

//favourites


function addFavourite(event) {
  const filmTitle = event.currentTarget.querySelector('h2');
  const filmTitleText = filmTitle.innerText;
  const filmImage = event.currentTarget.querySelector('img');
  const filmImageSrc = filmImage.src;
  const filmId = event.currentTarget.id;

  let foundIndex = findFavouriteIndex(filmId);

  if (foundIndex === -1) {
    const film = {
      title: filmTitleText,
      image: filmImageSrc,
      id: filmId
    };
    const newLi = createFilm(film, true);

    favouriteList.appendChild(newLi);
    favs.push(film);
    localStorage.setItem('movies', JSON.stringify(favs));
  }
}

function removeFavourite(film, newLi) {
  newLi.remove();
  const indexMovie = findFavouriteIndex(film.id);
  if (indexMovie > -1) {
    favs.splice(indexMovie, 1);
  }
  localStorage.setItem('movies', JSON.stringify(favs));
}

function findFavouriteIndex(id) {
  let foundIndex = -1;
  for (let i = 0; i < favs.length; i++) {
    if (favs[i].id === id) {
      foundIndex = i;
    }
  }
  return foundIndex;
}

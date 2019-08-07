'use strict';

const inputMovie = document.querySelector('.finder__input');
const btnFinder = document.querySelector('.finder__btn');
const resultList = document.querySelector('.result__list');

const ENDPOINT = 'http://api.tvmaze.com/search/shows?q=';

let newLis = '';

function getMovies() {
  const movieName = inputMovie.value;
  fetch(ENDPOINT + movieName)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (const item of data) {
        const nameMovie = item.show.name;
        const imageMovie = item.show.image.medium;
        const idMovie = item.show.id;
        console.log(item.show.url);

        newLis += `
        <li class="movie__item" id="${idMovie}">
          <img class="movie__image" src="${imageMovie}" alt="${nameMovie}">
          <h2 class="movie__title">${nameMovie}</h2>
          </li>
        `;


      }
      resultList.innerHTML = newLis;
    });
}

btnFinder.addEventListener('click', getMovies);

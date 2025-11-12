import { photos } from "../data/data.js";

let favoritePhotos = JSON.parse(localStorage.getItem('favoritePhotos')) || [
  {
    "id": "19110d63-f057-4654-befa-96694bd71ff2",
    "src": "images/image1.jpg",
    "type": "cars",
    "title": "Blue car on road",
    "description": "a blue car is parked on a road"
  }
];

let html = ``;

const selectElement = document.querySelector('.js-category');

export function renderHomePage(select = 'all') {

  selectElement.addEventListener('change', () => {
    html = ``;
    renderHomePage(selectElement.value);
    renderPhotoLightBox();
  });

  if (select === 'all') {
    photos.forEach(photo => {
      html +=
        `
    <button class="photo-btn js-photo-btn" data-id="${photo.id}">
      <img src="data/${photo.src}">
    </button>
    `;

    });

  } else if (select === 'nature') {
    const selectedPhotos = photos.filter(photo => photo.type === 'nature');
    selectedPhotos.forEach(photo => {
      html +=
        `
    <button class="photo-btn js-photo-btn" data-id="${photo.id}">
      <img src="data/${photo.src}">
    </button>
    `;
    });
  } else if (select === 'food') {
    const selectedPhotos = photos.filter(photo => photo.type === 'food');
    selectedPhotos.forEach(photo => {
      html +=
        `
    <button class="photo-btn js-photo-btn" data-id="${photo.id}">
      <img src="data/${photo.src}">
    </button>
    `;
    });
  } else if (select === 'cars') {
    const selectedPhotos = photos.filter(photo => photo.type === 'cars');
    selectedPhotos.forEach(photo => {
      html +=
        `
    <button class="photo-btn js-photo-btn" data-id="${photo.id}">
      <img src="data/${photo.src}">
    </button>
    `;
    });
  }

  document.querySelector('.js-photos-grid').innerHTML = html;
}


export function renderFavoritesPage() {

  favoritePhotos.forEach(photo => {
    html +=
      `
    <button class="photo-btn js-photo-btn" data-id="${photo.id}">
      <img src="data/${photo.src}">
    </button>
    `;
  });

  document.querySelector('.js-photos-grid').innerHTML = html;
}



export function renderPhotoLightBox() {
  const photoBtn = document.querySelectorAll('.js-photo-btn');
  photoBtn.forEach(button => {
    button.addEventListener('click', () => {
      const matchingPhoto =
        photos.filter(photo => button.dataset.id === photo.id);
      // console.log(matchingPhoto[0]);
      document.querySelector('.js-photo-light-box').innerHTML =
        `
      <img src="data/${matchingPhoto[0].src}">
      <p class="title"><span>Title: </span>${matchingPhoto[0].title}</p>
      <p class="description"><span>Description: </span>${matchingPhoto[0].description}</p>
      <button class="favorite-btn js-favorite-btn">Add To Favorite</button>
      <button class="x-button js-x-button">X</button>
      `;


      const favoriteBtn = document.querySelector('.js-favorite-btn');
      // if (matchingPhoto[0].exist) {;
      //   favoriteBtn.textContent = 'Remove From Favorites';
      // }

      photos.forEach(photo => {
        if (photo.id === matchingPhoto[0].id && photo.exist === true) {
          favoriteBtn.textContent = 'Remove From Favorites';
        }
      });

      favoriteBtn.addEventListener('click', () => {
        if (!matchingPhoto[0].exist) {
          photos.forEach(photo => {
            if (photo.id === matchingPhoto[0].id) {
              photo.exist = true;
            }
          });
          favoritePhotos.push(matchingPhoto[0]);
          favoriteBtn.textContent = 'Remove From Favorites';
        } else {
          photos.forEach(photo => {
            if (photo.id === matchingPhoto[0].id) {
              photo.exist = false;
            }
          });
          favoritePhotos = favoritePhotos.filter(photo => photo.id !== matchingPhoto[0].id);
          favoriteBtn.textContent = 'Add To Favorites';
        }

        localStorage.setItem('favoritePhotos', JSON.stringify(favoritePhotos));
        localStorage.setItem('photos', JSON.stringify(photos));
      });


      const xBtn = document.querySelector('.js-x-button');
      xBtn.addEventListener('click', () => {
        document.querySelector('.js-light-box').classList.remove('display');
        document.querySelector('.js-photo-light-box').innerHTML = ``;
        if (window.location.pathname.endsWith('/favorites.html')) {
          html = ``;
          renderFavoritesPage();
          renderPhotoLightBox();
        }
      });

      document.querySelector('.js-light-box').classList.add('display');
    });
  });

}

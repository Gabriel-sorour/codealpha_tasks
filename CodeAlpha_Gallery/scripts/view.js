import { renderFavoritesPage, renderHomePage, renderPhotoLightBox } from "./model.js";
import "./model.js";
import "./controller.js";

if (window.location.pathname === '/favorites.html') {
  renderFavoritesPage();
  renderPhotoLightBox();
} else {
  renderHomePage();
  renderPhotoLightBox();
}
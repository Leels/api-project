import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './services/giphy-service';

function clearFields() {
  $('#term').val("");
  $('.show-errors').text("");
  $('.show-gif').text("");
}

function displayGif(response) {
  const url = response.data[0].images.downsized.url
  $('.show-gif').html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function () {
  $('#gifSearch').click(function () {
    let searchTerm = $('#term').val();
    clearFields();
    GiphyService.getGif(searchTerm)
      .then(function (giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        displayGif(giphyResponse);
      })
      .catch(function (error) {
        displayErrors(error.message)
      })
  });
});
var $search = document.querySelector('#search');
var $homePage = document.querySelector('#home-page');
var $searchResults = document.querySelector('#search-result');
var $homeNav = document.querySelector('.home');

$search.addEventListener('keydown', search);
$homeNav.addEventListener('click', navBar);

function search() {
  if (event.key === 'Enter') {
    $search.value = '';
    $homePage.className = 'hidden';
    $searchResults.className = '';
  }
}

function navBar() {
  if (event.target.matches('.home')) {
    $homePage.className = '';
    $searchResults.className = 'hidden';
  }
}

var pokemon = new XMLHttpRequest();
var $pokemonList = document.querySelector('ul');

pokemon.open('GET', 'https://api.pokemontcg.io/v2/cards');
pokemon.responseType = 'json';
pokemon.addEventListener('load', function () {
  var $pokemonSearch = document.createElement('li');
  $pokemonList.appendChild($pokemonSearch);
  var $row = document.createElement('div');
  $row.className = 'row';
  $pokemonSearch.appendChild($row);
  var firstNumber = Math.floor(Math.random() * 250);
  var $imgColumn = document.createElement('div');
  $imgColumn.className = 'col-fourth';
  $row.appendChild($imgColumn);
  var $pokemonImg = document.createElement('img');
  $pokemonImg.setAttribute('src', pokemon.response.data[firstNumber].images.small);
  $imgColumn.appendChild($pokemonImg);
  var $cardInfo = document.createElement('div');
  $cardInfo.className = 'col-fourth card-info';
  var $pokemonName = document.createElement('p');
  $pokemonName.textContent = pokemon.response.data[firstNumber].name;
  var $pokemonSet = document.createElement('p');
  $pokemonSet.textContent = pokemon.response.data[firstNumber].set.name;
  var $price = document.createElement('p');
  $price.textContent = pokemon.response.data[firstNumber].tcgplayer.prices.market;

  $cardInfo.appendChild($pokemonName);
  $cardInfo.appendChild($pokemonSet);
  $cardInfo.appendChild($price);
  $row.appendChild($cardInfo);

});

pokemon.send();

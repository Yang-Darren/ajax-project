var $search = document.querySelector('#search');
var $homePage = document.querySelector('#home-page');
$search.addEventListener('keydown', search);

function search() {
  if (event.key === 'Enter') {
    $search.value = '';
    $homePage.className = 'hidden';
  }
}

var pokemon = new XMLHttpRequest();
var $pokemonList = document.querySelector('#pokemon-list');

pokemon.open('GET', 'https://api.pokemontcg.io/v2/cards');
pokemon.responseType = 'json';
pokemon.addEventListener('load', function () {
  var firstNumber = Math.floor(Math.random() * 250);
  var $firstPokemon = document.createElement('li');
  var $firstSet = document.createElement('p');
  var $firstImg = document.createElement('img');
  var $firstPrice = document.createElement('p');
  $firstPokemon.textContent = pokemon.response.data[firstNumber].name;
  $firstSet.textContent = pokemon.response.data[firstNumber].set.name;
  $firstImg.setAttribute('src', pokemon.response.data[firstNumber].images.small);
  $firstPrice.textContent = pokemon.response.data[firstNumber].tcgplayer.prices.market;
  $pokemonList.appendChild($firstPokemon);
  $pokemonList.appendChild($firstSet);
  $pokemonList.appendChild($firstImg);
  $pokemonList.appendChild($firstPrice);
});

pokemon.send();

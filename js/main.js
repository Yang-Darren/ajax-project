const $search = document.querySelector('#search');
const $homePage = document.querySelector('#home-page');
const $searchResults = document.querySelector('#search-result');
const $searchNav = document.querySelector('.search-nav');
const $homeNav = document.querySelector('.home');
const pokemon = new XMLHttpRequest();
const $pokemonList = document.querySelector('ul');

$search.addEventListener('keydown', search);
$homeNav.addEventListener('click', homeNav);
$searchNav.addEventListener('click', searchClickHome);

function homeNav() {
  if (event.target.matches('.home')) {
    $homePage.className = '';
    $searchResults.className = 'hidden';
  }
}

function searchClickHome() {
  if (event.target.matches('.search-nav')) {
    $homePage.className = 'hidden';
    $searchResults.className = '';
  }
}

function search() {
  if (event.key === 'Enter') {
    $homePage.className = 'hidden';
    $searchResults.className = '';
  }
}

pokemon.open('GET', 'https://api.pokemontcg.io/v2/cards');
pokemon.responseType = 'json';
pokemon.addEventListener('load', function () {
  for (var i = 0; i < 250; i++) {
    if ($search.value === pokemon.response.data[i].name) {
      var $pokemonSearch = document.createElement('li');
      $pokemonSearch.className = 'col-fourth card';
      $pokemonList.appendChild($pokemonSearch);
      var $imgColumn = document.createElement('div');
      $pokemonSearch.appendChild($imgColumn);
      var $pokemonImg = document.createElement('img');
      $pokemonImg.setAttribute('src', pokemon.response.data[i].images.small);
      $imgColumn.appendChild($pokemonImg);
      var $cardInfo = document.createElement('div');
      $cardInfo.className = 'card-info';
      var $pokemonName = document.createElement('p');
      $pokemonName.className = 'pokemon-name';
      $pokemonName.textContent = pokemon.response.data[i].name;
      var $pokemonSet = document.createElement('p');
      $pokemonSet.className = 'pokemon-set';
      $pokemonSet.textContent = pokemon.response.data[i].set.name;
      var $rarity = document.createElement('p');
      $rarity.textContent = 'Rarity: ' + pokemon.response.data[i].rarity;
      var $cardType = document.createElement('p');
      $cardType.textContent = 'Card Type / Hp : ' + pokemon.response.data[i].types + ' / ' + pokemon.response.data[i].hp;
      var $addToFavorite = document.createElement('div');
      $addToFavorite.className = 'favorite-container';
      var $price = document.createElement('p');
      $price.className = 'price';
      $price.textContent = '$' + pokemon.response.data[i].cardmarket.prices.averageSellPrice;
      var $heart = document.createElement('i');
      $heart.className = 'fa fa-heart';

      $cardInfo.appendChild($pokemonName);
      $cardInfo.appendChild($pokemonSet);
      $cardInfo.appendChild($rarity);
      $cardInfo.appendChild($cardType);
      $addToFavorite.appendChild($price);
      $addToFavorite.appendChild($heart);
      $cardInfo.appendChild($addToFavorite);
      $pokemonSearch.appendChild($cardInfo);
    }
  } $search.value = '';
});

pokemon.send();

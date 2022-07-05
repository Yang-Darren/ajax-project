var $search = document.querySelector('#search');
var $homePage = document.querySelector('#home-page');
var $searchResults = document.querySelector('#search-result');
var $homeNav = document.querySelector('.home');
var pokemon = new XMLHttpRequest();
var $pokemonList = document.querySelector('ul');
var $pokemonSearch = document.createElement('li');
$pokemonSearch.className = 'row';
$pokemonList.appendChild($pokemonSearch);

$search.addEventListener('keydown', search);
$homeNav.addEventListener('click', navBar);

function navBar() {
  if (event.target.matches('.home')) {
    $homePage.className = '';
    $searchResults.className = 'hidden';
  }
}

pokemon.open('GET', 'https://api.pokemontcg.io/v2/cards');
pokemon.responseType = 'json';
pokemon.addEventListener('load', function () {
  for (var i = 0; i < 250; i++) {
    if ($search.value === pokemon.response.data[i].name) {
      var $imgColumn = document.createElement('div');
      $imgColumn.className = 'col-fourth';
      $pokemonSearch.appendChild($imgColumn);
      var $pokemonImg = document.createElement('img');
      $pokemonImg.setAttribute('src', pokemon.response.data[i].images.small);
      $imgColumn.appendChild($pokemonImg);
      var $cardInfo = document.createElement('div');
      $cardInfo.className = 'col-fourth card-info';
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

function search() {
  if (event.key === 'Enter') {
    $homePage.className = 'hidden';
    $searchResults.className = '';
  }
}

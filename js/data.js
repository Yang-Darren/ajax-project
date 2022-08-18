/* exported data */
var cardData = {
  collection: [],
  editing: null
};

var collectionValue = localStorage.getItem('collection-value');
if (collectionValue !== null) {
  cardData = JSON.parse(collectionValue);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(cardData);
  localStorage.setItem('collection-value', dataJSON);
});

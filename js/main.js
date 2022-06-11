var $search = document.querySelector('#search');
$search.addEventListener('keydown', search);

function search() {
  if (event.key === 'Enter') {
    $search.value = '';
  }
}

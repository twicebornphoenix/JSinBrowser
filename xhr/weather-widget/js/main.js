const request = new XMLHttpRequest();
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();

function onLoad() {
  const response = JSON.parse(request.responseText);
  setData(response);
}

request.addEventListener('load', onLoad);

export function fetchCard() {
  API_KAY = '31999317-3d5c3cea8ef86e3c7a76bbcc7';
  return fetch('https://www.thunderclient.com/welcome?key={API_KAY}&p&image_type=photo&orientation=horizontal&safesearch=true')
    .then(response => { return response.json(); })
}
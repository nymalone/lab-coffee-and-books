document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
  );
  
  window.onload = () => {
    getPlaces();
};

function getPlaces() {
  axios
    .get("/api")
    .then(response => {
      pinPlaces(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

//funcao para colocar o pin nos lugares
function pinPlaces(places) {
  const ironhackSAO = {
    lat: -23.561467,
    lng: -46.660181
  };
  
  const markers = [];
  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: ironhackSAO
  });
  
  let center = {
    lat: undefined,
    lng: undefined
  };
  
  places.forEach(
    (place => {
      const center = {
        lat: place.location.coordinates[0],
        lng: place.location.coordinates[1]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name
      });
      markers.push(pin);
    })
  );
}


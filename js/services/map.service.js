export const mapService = {
<<<<<<< HEAD
  initMap,
  addMarker,
  panTo,
=======
    initMap,
    addMarker,
    panTo,
    remove,
    setCenter,
    saveLocation,
    getAddressLoc
>>>>>>> 3544fc79fd58ba35351d1bfc3d35dc3022e413cb
}
import { locService } from './loc.service.js'

// Var that is used throughout this Module (not global)
var gMap, _gCurrInfOWin

function initMap(lat = 32.0749831, lng = 34.9120554) {
<<<<<<< HEAD
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
=======
    console.log('InitMap')
    return _connectGoogleApi().then(() => {
        console.log('google available')
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        })
        console.log('Map!', gMap)

        // Configure the click listener.
        gMap.addListener("click", ev => {
            const loc = locService.createLoc("home", ev.latLng.lat(), ev.latLng.lng())
            console.log(loc);
            panTo(loc)
            addMarker(loc)
            saveLocation(loc)
        }
        )

>>>>>>> 3544fc79fd58ba35351d1bfc3d35dc3022e413cb
    })
    console.log('Map!', gMap)

    // Configure the click listener.
    gMap.addListener('click', (ev) => {
      const loc = locService.createLoc('home', ev.latLng.lat(), ev.latLng.lng())
      console.log(loc)
      panTo(loc)
      addMarker(loc)
      saveLocation(loc)
    })
  })
}

function saveLocation(loc) {
  locService.saveLoc(loc)
}

<<<<<<< HEAD
=======
function remove(locId) {
    return storageService.remove(LOC_KEY, locId)
}

>>>>>>> 3544fc79fd58ba35351d1bfc3d35dc3022e413cb
function addMarker(loc) {
  openInfoWin(loc)
  //   console.log(title)
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'hi',
  })
  return marker
}

function panTo({ lat, lng }) {
<<<<<<< HEAD
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function openInfoWin(loc) {
  _gCurrInfOWin = new google.maps.InfoWindow({
    content: `<form onsubmit="setPlaceName(event, this.value))">
            <input type="text" placeholder="Location Name"/>
            <button>Save Location</button>
        </form>`,
    position: loc,
  })
  _gCurrInfOWin.open(gMap)
}

function setPlaceName(ev, name) {
  console.log(ev)
  ev.preventDefault()
  console.log(name)
  //   marker.title = name
=======
    var latLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(latLng)
>>>>>>> 3544fc79fd58ba35351d1bfc3d35dc3022e413cb
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyCTnsMp0vRfi2iLQOE0jgGMh3eVhtD2BKg'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}

function setCenter(loc) {
    const latLng = { lat: loc.lat, lng: loc.lng }
    gMap.setCenter(latLng);
    gMap.panTo(latLng)
}
function getAddressLoc(address) {
    const API_KEY = 'AIzaSyCTnsMp0vRfi2iLQOE0jgGMh3eVhtD2BKg'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
    return axios.get(url)
        .then(res => {
            console.log();
            const location = res.data.results[0].geometry.location
            return location
        })
}
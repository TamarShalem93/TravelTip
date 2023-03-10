export const mapService = {
  initMap,
  addMarker,
  panTo,
  remove,
  setCenter,
  saveLocation,
  getAddressLoc,
  getCurrLoc,
}
import { locService } from './loc.service.js'
import { utilService } from './util.service.js'

// Var that is used throughout this Module (not global)
var gMap, _gCurrInfOWin, gLoc

function initMap(lat, lng) {
  console.log('InitMap')

  if (!lat || !lng) {
    lat = utilService.getValFromParam(lat) || 32.0749831
    lng = utilService.getValFromParam(lng) || 34.9120554
  }
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    console.log('Map!', gMap)

    // Configure the click listener.
    gMap.addListener('click', (ev) => {
      gLoc = { lat: ev.latLng.lat(), lng: ev.latLng.lng() }
      const loc = locService.createLoc('home', ev.latLng.lat(), ev.latLng.lng())
      console.log(loc)
      panTo(loc)
      openInfoWin(loc)
      addMarker(loc)
      //   saveLocation(loc)
    })
  })
}

function saveLocation(loc) {
  locService.saveLoc(loc)
}

function remove(locId) {
  return storageService.remove(LOC_KEY, locId)
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'hi',
  })
  return marker
}

function panTo({ lat, lng }) {
  var latLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(latLng)
  if (_gCurrInfOWin) _gCurrInfOWin.close(gMap)
}

function openInfoWin(loc) {
  if (_gCurrInfOWin) _gCurrInfOWin.close(gMap)

  _gCurrInfOWin = new google.maps.InfoWindow({
    content: `<form class="loc-name-form" onsubmit="setPlaceName(event)">
            <input name="loc-name" type="text" placeholder="Location Name"/>
            <button>Save Location</button>
        </form>`,
    position: loc,
  })
  _gCurrInfOWin.open(gMap)
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
  gMap.setCenter(latLng)
  gMap.panTo(latLng)
}
function getAddressLoc(address) {
  const API_KEY = 'AIzaSyCTnsMp0vRfi2iLQOE0jgGMh3eVhtD2BKg'
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  return axios.get(url).then((res) => {
    console.log()
    const location = res.data.results[0].geometry.location
    return location
  })
}

function getCurrLoc() {
  return gLoc
}

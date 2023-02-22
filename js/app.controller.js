import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/util.service.js'

window.onDelete = onDelete
window.onGo = onGo
window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.setPlaceName = setPlaceName
window.onCopyLink = onCopyLink

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker(loc) {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then(renderLocs)
}

function renderLocs() {
  locService.getLocs().then(renderLocsList)
}

function renderLocsList(locs) {
  let strHtmls = `<table>`
  strHtmls += locs
    .map((loc) => {
      return `<tr>
            <td>${loc.name}</td>
            <td>${formatDate(loc.updatedAt)}</td>
            <td><button class="btn-go" onclick="onGo('${
              loc.id
            }')">Go</button></td>
            <td><button class="btn-delete" onclick="onDelete('${
              loc.id
            }')">Delete</button></td>
            </tr>
        `
    })
    .join('')
  strHtmls += `</table>`
  document.querySelector('.locs').innerHTML = strHtmls
}

function onGo(id) {
  locService.getLoc(id).then(mapService.panTo)
}

function onDelete(id) {
  console.log(id)
  locService.remove(id).then(renderLocs)
}

function formatDate(timestamp) {
  const today = new Date(timestamp)
  return today.toLocaleDateString()
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log(pos)
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      mapService.panTo({ lat, lng })
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${lat} - Longitude: ${lng}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo(ev) {
  if (ev) ev.preventDefault()
  const address = document.querySelector('.text-pan').value
  mapService.getAddressLoc(address).then((loc) => {
    mapService.panTo(loc)
    mapService.addMarker(loc)
    const location = locService.createLoc(address, loc.lat, loc.lng)
    location.name = address
    mapService.saveLocation(location)
  })
}

function setPlaceName(ev) {
  ev.preventDefault()
  const name = document.querySelector('[name="loc-name"]').value
  const latLng = mapService.getCurrLoc()
  const loc = locService.createLoc(name, latLng.lat, latLng.lng)
  mapService.saveLocation(loc)
}

function onCopyLink() {
  console.log('copy')
  const url = `https://tamarshalem93.github.io/TravelTip/index.html?lat=3.14&lan=1.63`
  navigator.clipboard.writeText(url)
}

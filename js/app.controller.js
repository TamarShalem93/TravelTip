import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onDelete = onDelete
window.onGo = onGo
window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onLocationAdd = onLocationAdd
function onInit() {
    mapService.initMap()
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

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(renderLocs)
}

function renderLocs() {
    locService.getLocs().then(renderLocsTable)

}

function renderLocsTable(locs) {
    let strHtmls = `<table>`
    strHtmls += locs.map(loc => {
        return `<tr>
            <td>${loc.id}</td>
            <td>${loc.name}</td>
            <td>${formatDate(loc.createdAt)}</td>
            <td>${formatDate(loc.updatedAt)}</td>
            <td><button onclick="onGo('${loc.id}')">Go</button></td>
            <td><button onclick="onDelete('${loc.id}')">Delete</button></td>
            </tr>
        `
    }).join('')
    strHtmls += `</table>`
    document.querySelector('.locs').innerHTML = strHtmls
}

function onGo(id) {
    locService.getLoc(id)
        .then(console.log)
}

function onDelete(id) {
    console.log(id);
    locService.remove(id)
        .then(renderLocs)
}

function formatDate(timestamp) {
    const today = new Date(timestamp)
    return today.toDateString()
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}


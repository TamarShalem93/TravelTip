import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
// const pets = []
const LOC_KEY = 'locDB'
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]
const WEATHER_KEY = ''

_createLocs()

export const locService = {
    getLocs,
    getFilterBy,
    setFilterBy,
    saveLoc
}


function getLocs() {
    return storageService.query(LOC_KEY)
}

function get(locID) {
    return storageService.get(LOC_KEY, locID)
}

function remove(locID) {
    return storageService.remove(LOC_KEY, locID)
    // return axios.remove(url, petId)
}

function saveLoc(loc) {

    if (loc.id) {
        return storageService.put(LOC_KEY, loc)
    } else {
        return storageService.post(LOC_KEY, loc)
    }
}

function getEmptyLoc(name = '') {
    return { id: '', name }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minScore !== undefined) gFilterBy.minScore = filterBy.minScore
    return gFilterBy
}

function _createLocs() {
    let locs = utilService.loadFromStorage(LOC_KEY)
    console.log(locs);
    if (!locs || !locs.length) {
        locs = _createDemoLocs()
    }
    localStorage.setItem(LOC_KEY, JSON.stringify(locs))
}

function _createDemoLocs() {
    return locs.map(({ name, lat, lng }) => {
        const loc = _createLoc(name, lat, lng)
        return loc
    }
    )
}

function _createLoc(name, lat, lng) {
    const loc = getEmptyLoc()
    loc.id = utilService.makeId()
    loc.name = name || utilService.randomLocName()
    loc.lat = lat || utilService.generateRandomLat()
    loc.lng = lng || utilService.generateRandomLng()
    loc.createdAt = Date.now()
    loc.updatedAt = Date.now()
    return loc
}

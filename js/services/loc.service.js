import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PET_KEY = 'petDB'
var gFilterBy = { txt: '', minScore: 0 }
_createPets()

export const petService = {
    query,
    get,
    remove,
    save,
    getEmptyPet,
    getFilterBy,
    setFilterBy
}
export const locService = {
  getLocs,
}

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}


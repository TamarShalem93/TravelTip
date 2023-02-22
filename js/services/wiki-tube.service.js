
import { storageService } from './storage.service.js'

export const wtService = {
    getVideos,
    getWikis
}

const KEY = 'videosDB'

function getVideos(term) {
    const termVideosMap = storageService.load(KEY) || {}
    if (termVideosMap[term]) return Promise.resolve(termVideosMap[term])

    console.log('Getting from Network')

    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=${term}`)
        .then(res => res.data.items)
        .then(ytVideos => ytVideos.map(ytVideo => ({
            id: ytVideo.id.videoId,
            title: ytVideo.snippet.title,
            img: {
                url: ytVideo.snippet.thumbnails.default.url,
                width: ytVideo.snippet.thumbnails.default.width,
                height: ytVideo.snippet.thumbnails.default.height,
            }
        })))
        .then(videos => {
            termVideosMap[term] = videos
            storageService.save(KEY, termVideosMap)
            return videos
        })

}

function getWikis(term) {
    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${term}&format=json`)
        .then(res => res.data.query.search.splice(0, 5))
}
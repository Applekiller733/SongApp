
//const API_URL = "PLACEHOLDER";

const songdata = [
    {
        id: '1',
        name: 'Island in the Sun',
        artist: 'Weezer',
        upvotes: 6,
        video: 'https://www.youtube.com/embed/erG5rgNYSdk?si=iiBLEAVvbKEmtGtQ'
    },
    {
        id: '2',
        name: 'Passenger',
        artist: 'Deftones',
        upvotes: 10,
        image: 'https://i1.sndcdn.com/artworks-cA8SCHiCogzH-0-t500x500.jpg',
        sound: 'https://www.youtube.com/watch?v=IjainiB8mk4'
    },
    {
        id: '3',
        name: 'Placeholder',
        artist: '???',
        upvotes: 420,
        sound: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
]

export function fetchSongsMocked() {
    return new Promise(resolve => setTimeout(() => {resolve(songdata)}, 500));
}

export function fetchSongs() {
    return "NOT IMPLEMENTED";
}

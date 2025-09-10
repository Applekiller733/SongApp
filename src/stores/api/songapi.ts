
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
    },
    {
        id: '4',
        name: 'Warrior',
        artist: "Disturbed",
        upvotes: 3451,
        image: 'https://i1.sndcdn.com/artworks-000140282568-baa0pd-t500x500.jpg',
        sound: 'https://www.youtube.com/watch?v=O-1Q25kb-2w'
    },
    {
        id: '5',
        name: 'Runaway',
        artist: 'Linking Park',
        upvotes: 65472,
        image: 'https://linkinpedia.com/www/w/images/thumb/c/c5/Studio-Hybrid_Theory_Cover.jpg/1200px-Studio-Hybrid_Theory_Cover.jpg',
        sound: 'https://www.youtube.com/watch?v=ig-fyQqf510',
    },
    {
        id: '6',
        name: 'Time Window',
        artist: 'Simon Viklund',
        upvotes: 486,
        image: 'https://i.scdn.co/image/ab67616d0000b2739aa7a825a468735e9e841780',
        sound: 'https://www.youtube.com/watch?v=9vmM7tuHPcI',
    }
]

export function fetchSongsMocked() {
    return new Promise(resolve => setTimeout(() => {resolve(songdata)}, 500));
}

export function fetchSongs() {
    return "NOT IMPLEMENTED";
}

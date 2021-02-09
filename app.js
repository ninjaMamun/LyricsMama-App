const searchLyric = async() => {
    const searchInput = document.getElementById('search-input').value;
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchInput}`);
    const data = await res.json();
    displaySongs(data.data);
}

const displaySongs = songs =>{
    const lyricsContainer = document.getElementById('lyrics-container');
    lyricsContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>

        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">Get Lyrics</button>
        </div>

        `
        lyricsContainer.appendChild(songDiv);
        
    });
}

const getLyric = async (artist, title) =>{
    try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await res.json();
        displayLyric(data.lyrics);
        
    } catch (error) {
        console.log(error);
    }
    
}
const displayLyric = lyric =>{

    if(lyric){
        const lyricsDiv = document.getElementById('lyric');
        lyricsDiv.innerText = '';
        lyricsDiv.innerText = lyric;
    }else{
        const lyricsDiv = document.getElementById('lyric');
        lyricsDiv.innerText = '';
        lyricsDiv.innerText = 'Sorry Lyrics Not Found For This Song';
    }
}

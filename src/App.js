import { useEffect, useState } from 'react';
import './Styles/App.css';
import Playlist from './component/Playlist';
import SearchBar from './component/SearchBar';
import SearchResults from './component/SearchResults';
import Spotify from './util/Spotify';


function App() {

  const [searchResults, setSearchResults] = useState([]);

  const [playlistName, setPlaylistName] = useState('')

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [isSaving, setIsSaving] = useState(false);

  const loadPlaylistFromLocalStorage = () => {
    const data = window.localStorage.getItem('MY_SAVE_PLAYLIST');
    const savedPlaylist = JSON.parse(data);
    if (savedPlaylist) {
      setPlaylistName(savedPlaylist.playlistName);
      setPlaylistTracks(savedPlaylist.playlistTracks);
    }
  };

  const savePlaylistToLocalStorage = () => {
    const savedPlaylist = {
      playlistName,
      playlistTracks,
    };
    window.localStorage.setItem('MY_SAVE_PLAYLIST', JSON.stringify(savedPlaylist));
  };

  const addTrack = (track) => {
    const actualPlaylist = playlistTracks.map((track) => track.id);
    if (!playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      setSearchResults(searchResults.filter((track) => !actualPlaylist.includes(track.id)));
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
  };

  useEffect(() => {
    loadPlaylistFromLocalStorage();
  }, []);

  useEffect(() => {
    savePlaylistToLocalStorage();
  }, [playlistName, playlistTracks]);

  useEffect(() => {
    const actualPlaylist = playlistTracks.map((track) => track.id);
    setSearchResults((prevResults) => prevResults.filter((track) => !actualPlaylist.includes(track.id)));
  }, [playlistTracks]);

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id))
    setSearchResults((prevResults) => [...prevResults, track]);
  }
  
  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  }

  const search = async (term) => {
    const searchResults = await Spotify.search(term);
    const actualPlaylist = playlistTracks.map((track) => track.id);
    setSearchResults(searchResults.filter((track) => !actualPlaylist.includes(track.id)));
  };

  const savePlaylist = () => {
    setIsSaving(true);

    const trackURIs = playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(playlistName, trackURIs)
      .then(()=> {
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
        setIsSaving(false);
    })
  }

  return (
    <div className="App">
        <h1>Create a <span className='highlight'>Spotifly</span> Playlist</h1>
        <div className='App'>
          <SearchBar onSearch={search}/>
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist onSave={savePlaylist} onNameChange={updatePlaylistName} playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} isSaving={isSaving}/>
          </div>
        </div>
    </div>
  );
}

export default App;

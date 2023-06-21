import React from 'react';
import Tracklist from './Tracklist';
import "../Styles/Playlist.css"

const Playlist = (props) => {

    const handleChangeName = (e) => {
        props.onNameChange(e.target.value)
    }

    return (
        <div className="Playlist">
            <input value={props.playlistName || 'New Playlist'} onChange={handleChangeName}/>
            <Tracklist tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval='true'/>
            <button className="Playlist-save" onClick={props.onSave}>{props.isSaving ? 'Saving...' : 'SAVE TO SPOTIFY'}</button>
        </div>
    );
};

export default Playlist;
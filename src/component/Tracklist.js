import React from 'react';
import "../Styles/Tracklist.css"
import Track from './Track'

const Tracklist = (props) => {

    return (
        <div className="TrackList">
            {props.tracks.map((track) => {
                return (
                    <Track 
                    track={track}
                    key={track.id}
                    onAdd={props.onAdd}
                    onRemove={props.onRemove}
                    isRemoval={props.isRemoval}
                    />
                )
            })}    
        </div>
    );
};

export default Tracklist;
import React from 'react';
import "../Styles/Track.css"

const Track = (props) => {
    
    const renderAction = () => {
        if (props.isRemoval) {
            return <button className='Track-action' onClick={removeTrack}>-</button>
        } else {
            return <button className='Track-action' onClick={addTrack}>+</button>
        }
    }

    const addTrack = (event) => {
        props.onAdd(props.track)
    }

    const removeTrack = (event) => {
        props.onRemove(props.track)
    }

    return (
        <div className='Track'>
            <div className='Track-information'>
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | <a href={props.track.albumLink} target='_blank'>{props.track.album}</a></p>
            </div> 
            {renderAction()}
        </div>
    );
};

export default Track;
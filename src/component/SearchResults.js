import React from 'react';
import Tracklist from './Tracklist';
import "../Styles/SearchResults.css"

const SearchResults = (props) => {
    return (
        <div className='SearchResults'>
            <h2>Results</h2>
            <Tracklist tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    );
};

export default SearchResults;
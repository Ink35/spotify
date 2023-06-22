import React, { useState } from "react";
import "../Styles/SearchBar.css"

function SearchBar(props){
    const [term, setTerm] = useState('')

    const search = (e) => {
        e.preventDefault();
        props.onSearch(term)
    }

    const handleTermChange = (e) => {
        setTerm(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            search();
        }
    }

    return (
        <div className="SearchBar">
            <input placeholder='Enter A Song, Album, or Artist' onKeyPress={handleKeyPress} onChange={handleTermChange}/>
            <button className='SearchButton' onClick={search}>SEARCH</button>
        </div>
    )
}

export default SearchBar
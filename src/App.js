import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumView from "./Components/AlbumView";
import ArtistView from "./Components/ArtistView";
import Gallery from "./Components/Gallery";
import SearchBar from "./Components/SearchBar";
import { Fragment } from "react";


function App() {
  // Search 
  const [search, setSearch] = useState('')

  // Message
  const [message, setMessage] = useState('Search for Music!')

  // Data  

  const [data, setData] = useState([])

  // Handle Seearch
  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)

  }

  // UseEffect

  useEffect( () => {
    if (search){
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
        const data = await response.json()
        console.log(data)
  
        if (data.results.length > 0) {
          setData (data.results)
        } else {
          setMessage('Not Found')
        }
      }
  
      fetchData()
    }
  
  }, [search])
    return (
    <div>
    {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        <Gallery data={data} />
                    </Fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
    </div>
);
}

export default App;

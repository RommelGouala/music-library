import { useState, useEffect } from "react";
import Gallery from "./Components/Gallery";
import SearchBar from "./Components/SearchBar";

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
      < SearchBar handleSearch={handleSearch} />
      {message}
      < Gallery data={data} />
    </div>
  );
}

export default App;

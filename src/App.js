import React,{ useState , useEffect} from 'react';
import './App.css';
import Child from "./Child";
//1
function App() {

  const [recipe,setRecipe]=useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('chicken');

  useEffect(()=>{
    getApiData();
  },[query])

  const getApiData = async() =>{
    const APP_ID = 'f0c20d5f';
    const APP_KEY = '0acbc34b99170b700ce1903b87b4b1db';
    const res = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data = await res.json();
    setRecipe(data.hits);
    // console.log(data.hits)
  }
  const updateSearch = e =>{
    setSearch(e.target.value);
  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-input" 
          type="text" 
          value={search} 
          onChange={updateSearch}
        />
        <button className="search-btn" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipe.map(item=>
          <Child
            key={item.recipe.label}
            title={item.recipe.label}
            text={item.recipe.calories}
            img={item.recipe.image}
            ingredients={item.recipe.ingredients}
          />
        )}
      </div>
    </div>
  );
}

export default App;

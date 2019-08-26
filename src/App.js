import React,{ useState , useEffect ,createContext ,useContext  } from 'react';
import "./reset.css";
import './App.css';
import Child from "./Child";
import Loadding from './Loadding';
// 建立一個 Context Component
const parentContext = createContext();
function App() {
  const [recipe,setRecipe]=useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('chicken');
  const [load,setLoad]=useState(false);
  useEffect(()=>{
    setLoad(true);
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
    setLoad(false);
  }
  const updateSearch = e =>{
    setSearch(e.target.value);
  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  const getRecom = e =>{
    setQuery(e.target.innerText);
  }
  const passcontext = { load,recipe }
  return (
      // 將要傳遞的資料放進 Context Component.Provider 的 value 中 
      <parentContext.Provider value={passcontext}>
        <div className="App">
          <h1>Recipes Search</h1>
          <form onSubmit={getSearch} className="search-form">
            <input 
              className="search-input" 
              type="text" 
              value={search} 
              onChange={updateSearch}
            />
            <button className="search-btn" type="submit">Search</button>
          </form>
          <ul className="recommend">
            <li>Recommend :</li>
            <li onClick={getRecom}>Banana</li>
            <li onClick={getRecom}>Apple</li>
            <li onClick={getRecom}>Tea</li>
            <li onClick={getRecom}>Pork</li>
            <li onClick={getRecom}>Fish</li>
          </ul>
          <h2 className="recipes-title">{query}</h2>
          <Recipes/>
        </div>
      </parentContext.Provider>
  );
}

const Recipes = () =>{
  // 將 Context Component 放進 useContext 中取得 value 的資料
  const catchContext = useContext(parentContext);
  const { load , recipe} = catchContext;
  return(
    <div className="recipes">
      {!load?recipe.map(item=>
        <Child
          key={item.recipe.label}
          title={item.recipe.label}
          text={item.recipe.calories}
          img={item.recipe.image}
          ingredients={item.recipe.ingredients}
        />
      )
      :recipe.map(item=><Loadding key={item.recipe.label}/>)}
    </div>
  )
}

export default App;

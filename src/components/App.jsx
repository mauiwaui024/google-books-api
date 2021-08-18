import React, {useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios";

function App() {
  const[book, setBook] = useState("");
  const[result, setResult] = useState([]);
  const apiKey = "AIzaSyAZOwcdH_uUkQYpjzKCXLCLWdwbbzjgPvc"
  const[sortBy, setSortBy]= useState("relevance");
  const [category, setCategory]= useState("");
  const [totalItems, setTotalItems] = useState("0")

  function handleChange(event){
    const book = event.target.value;
    setBook(book)
  };

  function handleSubmit(event){
    event.preventDefault()
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ category +"&key="+apiKey+"&orderBy="+sortBy+"&maxResults=30")
.then(function(res){
  setResult(res.data.items)
  setTotalItems(res.data.totalItems)
})
  };
  function onCategoryChange(event)  {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory)
    };

  return (
    <div className="container mt-4 ">
    <div className="form-wrapper">
    <h1>Books search with google books API</h1>
        <form className = "mt-4"onSubmit={handleSubmit}> 
          <div className="form-group ">
            <input onChange={handleChange} 
            type="text" className="form-control " 
            autoComplete="off" 
            placeholder="Enter book name">
            </input>
          </div>
          <button type="submit" className="btn btn-success"> Search now</button>

        </form>
<div className="select-wrapper m-4">
            <select className="m-4" onChange={function(event){
            let selectedSortBy = event.target.value;
            setSortBy(selectedSortBy)
          }}>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>

          <select onChange = {onCategoryChange}>
            <option value="">All</option>
            <option value="+subject:Art">Art</option>
            <option value="+subject:Biography">Biography</option>
            <option value="+subject:Computers">Computers</option>
            <option value="+subject:History">History</option>
            <option value="+subject:Medical">Medical</option>
            <option value="+subject:Poetry">Poetry</option>
          </select>
          </div>
          <p>Total items found: {totalItems}</p>
        </div>
          <div className="row">
       {result.map(book => {
        return (<Card 
            img = {book.volumeInfo.imageLinks === undefined
        ? ""
        : `${book.volumeInfo.imageLinks.thumbnail}`}
            category = {book.volumeInfo.categories}
            title = {book.volumeInfo.title}
            authors = {book.volumeInfo.authors}
          />
       )
      })}
       </div>

    </div>
  );
}

export default App;

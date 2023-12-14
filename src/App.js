import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const categories = [
   { name: "Всі" },
   { name: "Море" },
   { name: "Гори" },
   { name: "Архітектура" },
   { name: "Міста" },
];

function App() {
   const [collections, setCollections] = useState([]);
   const [searchValue, setSearchValue] = useState("");
   const [categoryId, setCategoryId] = useState(0);
   const [isLoading, setIsLoading] = useState(true);
   const [page, setPage] = useState(1);

   useEffect(() => {
      setIsLoading(true);

      const category = categoryId ? `category=${categoryId}` : "";

      fetch(
         `https://657b2827394ca9e4af13df29.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
      )
         .then((res) => res.json())
         .then((json) => {
            setCollections(json);
         })
         .catch((err) => {
            console.warn(err);
            alert("Помилка при отриманні даних!");
         })
         .finally(() => setIsLoading(false));
   }, [categoryId, page]);

   return (
      <div className="App">
         <h1>Моя колекція фотографій</h1>
         <div className="top">
            <ul className="tags">
               {categories.map((obj, index) => (
                  <li
                     onClick={() => setCategoryId(index)}
                     className={categoryId === index ? "active" : ""}
                     key={obj.name}
                  >
                     {obj.name}
                  </li>
               ))}
            </ul>
            <input
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               className="search-input"
               placeholder="Пошук по назві"
            />
         </div>
         <div className="content">
            {isLoading ? (
               <h2>Завантаження колекцій...</h2>
            ) : (
               collections
                  .filter((obj) => {
                     return obj.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                  })
                  .map((obj, index) => (
                     <Collection
                        key={index}
                        name={obj.name}
                        images={obj.photos}
                     />
                  ))
            )}
         </div>
         <ul className="pagination">
            {[...Array(5)].map((_, index) => (
               <li
                  onClick={() => setPage(index + 1)}
                  className={page === index + 1 ? "active" : ""}
               >
                  {index + 1}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default App;

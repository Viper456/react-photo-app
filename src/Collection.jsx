import React from 'react'

export const Collection = ({ images, name }) => {
   return (
      <div className="collection">
         <img src={images[0]} alt="item" className="collection__big" />
         <div className="collection__bottom">
            <img src={images[1]} alt="item" className="collection__mini" />
            <img src={images[2]} alt="item" className="collection__mini" />
            <img src={images[3]} alt="item" className="collection__mini" />
         </div>
         <h4>{name}</h4>
      </div>
   );
}
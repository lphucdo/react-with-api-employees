
import React from 'react';
 
function SearchComponent({ searchProduct, productSearchUserFunction }) {
    return (
        <header className="App-header">
            <h1>GeeksforGeeks Shopping Cart</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for Products..."
                    value={searchProduct}
                    onChange={productSearchUserFunction}
                />
            </div>
        </header>
    );
}
 
export default SearchComponent;
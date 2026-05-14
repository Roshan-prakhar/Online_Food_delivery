import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center mb-4">
              <h2 className="fw-bold" style={{ color: '#fff' }}>
                Discover <span style={{ color: '#f5a623' }}>Delicious</span> Food
              </h2>
              <p style={{ color: '#8b8b8b' }}>Search and filter your favorite dishes</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group mb-3" style={{ backgroundColor: '#1a1a1a', borderRadius: '50px', padding: '4px', border: '1px solid #2a2a2a' }}>
                <select 
                  className='form-select' 
                  style={{
                    maxWidth: '150px', 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    color: '#f5a623',
                    borderRadius: '50px 0 0 50px'
                  }} 
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Burger">Burger</option>
                  <option value="Cake">Cakes</option>
                  <option value="Ice cream">Ice Creams</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                </select>
                <input 
                  type="text" 
                  className='form-control' 
                  placeholder='Search your favorite dish...' 
                  style={{ 
                    backgroundColor: 'transparent', 
                    border: 'none', 
                    color: '#fff',
                    borderLeft: '1px solid #2a2a2a'
                  }}
                  onChange={(e) => setSearchText(e.target.value)} 
                  value={searchText} 
                />
                <button 
                  className='btn' 
                  type='submit'
                  style={{ 
                    backgroundColor: '#f5a623', 
                    color: '#000', 
                    borderRadius: '50px',
                    padding: '8px 20px',
                    fontWeight: '600'
                  }}
                >
                  <i className='bi bi-search'></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FoodDisplay category={category} searchText={searchText} />
    </main>
  )
}

export default ExploreFood;
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import { useState } from 'react';

const Home = () => {
  const [category, setCategory] = useState('All');
  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <Header />
      <div className="container">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} searchText={''}/>
      </div>
    </main>
  )
}

export default Home;
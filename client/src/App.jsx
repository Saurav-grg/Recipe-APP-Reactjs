import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import FullRecipe from './pages/FullRecipe';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="max-w-[1400px] min-h-screen mx-auto my-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<FullRecipe />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;

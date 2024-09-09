import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import FullRecipe from './pages/FullRecipe';
import Aboutus from './pages/Aboutus';
import Footer from './components/Footer';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="bg-background">
          <div className="max-w-[1400px] min-h-screen mx-auto my-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<FullRecipe />} />
              <Route path="/aboutus" element={<Aboutus />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

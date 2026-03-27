import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ArticlePage from './Pages/ArticlePage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[#FEFDF5]"> {/* A creamier background color */}
        <Navbar />
        <main className="flex flex-1 flex-col py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlePage />} />
          </Routes>
        </main>
        <footer className="border-t border-zinc-200 bg-[#FAFAF8] px-6 py-8">
          <p className="text-center text-sm text-zinc-500">
            &copy; 2024 The Swamp Chronicles. All ogre rights reserved.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
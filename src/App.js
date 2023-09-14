import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element= {<MovieList/>}  />
          <Route path='/movie/:id' element= {<MovieDetails/>}  />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

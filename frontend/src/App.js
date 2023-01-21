import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConvertPage } from './pages/ConvertPage';
import ErrorPage from "./pages/ErrorPage";


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/convert' element={<ConvertPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;

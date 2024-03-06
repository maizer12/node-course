import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { useEffect } from 'react';
import axios from './axios.js';
import { useDispatch } from 'react-redux';
import { authMe } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('/auth/me')
      .then((data) => dispatch(authMe()))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

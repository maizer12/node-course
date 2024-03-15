import { Routes, Route } from 'react-router-dom';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { useEffect } from 'react';
import axios from './axios';
import { useDispatch } from 'react-redux';
import { authMe } from './store/slices/authSlice';
import Layout from './layout';

function App() {
  const dispatch: any = useDispatch();
  useEffect(() => {
    axios
      .get('/auth/me')
      .then(() => dispatch(authMe()))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </Layout>
  );
}

export default App;

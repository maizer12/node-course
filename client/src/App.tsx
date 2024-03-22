import { Routes, Route } from 'react-router-dom';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import Layout from './layout';

function App() {
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

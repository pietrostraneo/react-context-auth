import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import PostDetails from './components/PostDetails/PostDetails';
import EditPost from './components/EditPost/EditPost';
import CreatePost from './components/CreatePost/CreatePost';
import UserProfile from './components/UserProfile/UserProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/post/:slug" element={<PostDetails />} />
            <Route path="/edit/:slug" element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;

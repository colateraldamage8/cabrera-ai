import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import Marketplace from './pages/Marketplace';
import RequestTool from './pages/RequestTool';
import MyLibrary from './pages/MyLibrary';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Admin from './pages/Admin';

const noLayoutRoutes = ['/login', '/signup', '/forgot-password'];

function Layout({ children, path }) {
  const isAuth = noLayoutRoutes.includes(path);
  return (
    <div className="min-h-screen bg-dark-900">
      {!isAuth && <Navbar />}
      <main>{children}</main>
      {!isAuth && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"               element={<Layout path="/"><Home /></Layout>} />
          <Route path="/tools"          element={<Layout path="/tools"><Tools /></Layout>} />
          <Route path="/tools/:slug"    element={<Layout path="/tools"><ToolDetail /></Layout>} />
          <Route path="/marketplace"    element={<Layout path="/marketplace"><Marketplace /></Layout>} />
          <Route path="/request"        element={<Layout path="/request"><RequestTool /></Layout>} />
          <Route path="/library"        element={<Layout path="/library"><MyLibrary /></Layout>} />
          <Route path="/admin"          element={<Layout path="/admin"><Admin /></Layout>} />
          <Route path="/login"          element={<Layout path="/login"><Login /></Layout>} />
          <Route path="/signup"         element={<Layout path="/signup"><SignUp /></Layout>} />
          <Route path="/forgot-password" element={<Layout path="/forgot-password"><ForgotPassword /></Layout>} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

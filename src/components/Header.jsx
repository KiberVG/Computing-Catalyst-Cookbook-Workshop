import { Home, BookOpen, Plus, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error('Failed to log out');
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-800">My Cookbook</h1>
        </div>
        <nav className="flex space-x-6 items-center">
          <Link
            to="/"
            className={`flex items-center space-x-1 hover:cursor-pointer ${isActive('/') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
              }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link
            to="/add"
            className={`flex items-center space-x-1 hover:cursor-pointer ${isActive('/add') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
              }`}
          >
            <Plus className="w-5 h-5" />
            <span>Add Recipe</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 ml-4"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

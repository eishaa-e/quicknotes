import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">QuickNotes</Link>
                <div>
                    {user ? (
                        <div className="flex gap-4">
                            <Link to="/" className="hover:text-gray-300">My Notes</Link>
                            <Link to="/trash" className="hover:text-gray-300">Trash</Link>
                            <button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/register" className="hover:text-gray-300">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

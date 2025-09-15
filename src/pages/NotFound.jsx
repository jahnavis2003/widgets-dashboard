import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen text-white bg-black px-4">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="px-6 py-2 bg-[#FD3F3F] hover:bg-[#FF5252] text-white font-semibold rounded transition"
    >
      Back to Dashboard
    </Link>
  </div>
);

export default NotFound;

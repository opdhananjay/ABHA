import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">

      <h1 className="text-6xl font-bold text-gray-700 mb-4">
        404
      </h1>

      <p className="text-xl text-gray-600 mb-6">
        Page Not Found
      </p>

      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
      >
        Go Back Home
      </button>

    </div>
  );
};

export default NotFound;
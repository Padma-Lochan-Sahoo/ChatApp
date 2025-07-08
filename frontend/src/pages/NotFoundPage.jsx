import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
    <AlertTriangle className="w-16 h-16 text-warning mb-4" />
    <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
    <p className="mb-6 text-base-content/70">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link to="/" className="btn btn-primary">
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;
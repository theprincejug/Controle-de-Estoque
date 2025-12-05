import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Controle de Estoque
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/inventory"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Estoque
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};



import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, LogOut, Package2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast.success('Вы успешно вышли из системы');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Боковая панель */}
      <div className="w-64 bg-construction-dark text-white flex flex-col">
        <div className="p-4 border-b border-construction-light/20">
          <h1 className="text-xl font-serif">Админ-панель</h1>
          <p className="text-sm text-construction-light/70">Привет, {user?.username}</p>
        </div>
        
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Home size={18} />
                <span>Дашборд</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/projects" 
                className={({ isActive }) => 
                  `flex items-center gap-2 p-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Package2 size={18} />
                <span>Проекты</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-construction-light/20">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-2 rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Выйти</span>
          </button>
        </div>
      </div>
      
      {/* Основной контент */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-white flex items-center px-6">
          <h2 className="text-lg font-medium text-construction-dark">Панель управления</h2>
        </header>
        
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

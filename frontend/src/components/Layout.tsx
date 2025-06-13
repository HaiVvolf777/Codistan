import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Users, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users },
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();

  const currentPath = routerState.location.pathname;

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] w-[100vw] min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="row-span-2 hidden lg:block w-64 bg-white shadow-md z-50">
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900">Admin Panel</span>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 !text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      activeProps={{
                        className: 'bg-gradient-to-r from-blue-500 to-purple-600 !text-white shadow-md'
                      }}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="col-span-full lg:col-start-2 sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm">
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="ml-auto text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </header>

      <main className="overflow-y-auto h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8 w-[100vw] lg:w-auto">
        <Outlet />
      </main>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transition-transform transform translate-x-0">
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <span className="text-xl font-semibold text-gray-900">Admin Panel</span>
              <button 
                className="p-2 rounded-md hover:bg-gray-100" 
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="px-3 py-4 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-lg font-medium text-sm ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    activeProps={{
                      className: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
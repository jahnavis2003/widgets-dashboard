import "./Header.css";
import { Plus, Settings, Search, Bell } from 'lucide-react';

const Header = ({ totalWidgets, data, setSidebarOpen, searchTerm, setSearchTerm }) => {
  // console.log("Header data:", data);
  return (
    <header className=" header bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
                <span>{totalWidgets} widgets</span>
                <span>•</span>
                <span>{data && data.categories ? data.categories.length : 0} categories</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search widgets..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => setSidebarOpen()}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Widget</span>
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header

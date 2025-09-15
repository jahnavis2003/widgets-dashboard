import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import Category from '../components/Category';
import AddWidgetSidebar from '../components/AddWidgetSidebar';
import Header from '../layout/layoutComponents/Header';

const Dashboard = () => {
  const { data, selectedWidgets, toggleWidget, removeWidget } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const totalWidgets = Object.values(selectedWidgets).reduce((sum, widgets) => sum + widgets.length, 0);

// Only include categories with widgets that are actually in the dashboard
const filteredCategories = data.categories
  .map(category => {
    // keep only widgets that are both in selectedWidgets and match search
    const selected = selectedWidgets[category.id] || [];
    const widgetsInDashboard = category.widgets.filter(widget =>
      selected.includes(widget.id) &&
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      ...category,
      widgets: widgetsInDashboard
    };
  }).filter(category => category.widgets.length > 0);

  const handleAddWidget = (categoryId) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory('');
    }
    setSidebarOpen(true);
  };
  console.log("Dashboard data:", filteredCategories);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        totalWidgets={totalWidgets} 
        data={data} 
        setSidebarOpen={handleAddWidget} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        {searchTerm && filteredCategories.length === 0 ?(
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets match your search</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria.</p>
            </div>
            ) : totalWidgets === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets added</h3>
                    <p className="text-gray-500 mb-6">Get started by adding some widgets to your dashboard.</p>
                    <button
                        onClick={() => handleAddWidget()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Add Your First Widget
                    </button>
                </div>
            ) : (
                <div>
                    {filteredCategories.map((category) => (
                        <Category
                            key={category.id}
                            category={category}
                            selectedWidgets={selectedWidgets[category.id] || []}
                            onRemoveWidget={(widgetId) => removeWidget(category.id, widgetId)}
                            onAddWidget={handleAddWidget}
                        />
                    ))}
                </div>
            )}
        </main>

      {/* Add Widget Sidebar */}
      <AddWidgetSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        data={data}
        selectedWidgets={selectedWidgets}
        onToggleWidget={toggleWidget}
        initialCategory={selectedCategory}
      />
    </div>
  );
};

export default Dashboard;
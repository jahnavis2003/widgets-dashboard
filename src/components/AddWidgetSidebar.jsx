import { useState, useEffect } from 'react';
import { X, BarChart3, Gauge, Share2, ShoppingCart, Check } from 'lucide-react';
import notify from './Notifications';

const iconMap = {
  BarChart3, Gauge, Share2, ShoppingCart
};

const AddWidgetSidebar = ({
  isOpen,
  onClose,
  data,
  selectedWidgets,
  onToggleWidget,
  initialCategory
}) => {
  const [activeTab, setActiveTab] = useState(data.categories[0]?.id || '');
  const [pendingWidgets, setPendingWidgets] = useState({});
  const [categorySpecific, setCategorySpecific] = useState(false);

  // Initialize pending widgets when sidebar opens
  useEffect(() => {
    if (isOpen) {
      setPendingWidgets(selectedWidgets);
      if (initialCategory) {
        setActiveTab(initialCategory);
        setCategorySpecific(true);
      } else {
        setCategorySpecific(false);
      }
    }
  }, [isOpen, selectedWidgets, initialCategory]);

  const handleToggleWidget = (categoryId, widgetId) => {
    setPendingWidgets(prev => {
      const categoryWidgets = prev[categoryId] || [];
      const isSelected = categoryWidgets.includes(widgetId);
      
      if (isSelected) {
        return {
          ...prev,
          [categoryId]: categoryWidgets.filter(id => id !== widgetId)
        };
      } else {
        return {
          ...prev,
          [categoryId]: [...categoryWidgets, widgetId]
        };
      }
    });
  };

  const handleSubmit = () => {
    // Apply all pending changes
    Object.entries(pendingWidgets).forEach(([categoryId, widgetIds]) => {
      const currentWidgets = selectedWidgets[categoryId] || [];
      
      // Add new widgets
      widgetIds.forEach(widgetId => {
        if (!currentWidgets.includes(widgetId)) {
          onToggleWidget(categoryId, widgetId);
        }
      });
      
      // Remove widgets that are no longer selected
      currentWidgets.forEach(widgetId => {
        if (!widgetIds.includes(widgetId)) {
          onToggleWidget(categoryId, widgetId);
        }
      });
    });
    
    onClose();
  };

  const handleCancel = () => {
    setPendingWidgets(selectedWidgets);
    onClose();
  };

  if (!isOpen) return null;

  const activeCategory = data.categories.find(cat => cat.id === activeTab);
  const categoriesToShow = categorySpecific && initialCategory 
    ? data.categories.filter(cat => cat.id === initialCategory)
    : data.categories;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-transparent bg-opacity-50 z-40 transition-opacity"
        onClick={handleCancel}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[600px] bg-white shadow-2xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              {categorySpecific && initialCategory 
                ? `Add ${data.categories.find(cat => cat.id === initialCategory)?.name} Widgets`
                : 'Add Widgets'
              }
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Category Tabs - Only show if not category specific */}
          {!categorySpecific && (
            <div className="flex border-b border-gray-200">
              {data.categories.map((category) => {
                const IconComponent = iconMap[category.icon] || BarChart3;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === category.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          )}
          
          {/* Widget List */}
          <div className="flex-1 overflow-y-auto p-6 pb-20">
            {activeCategory && (
              <div className="space-y-4">
                {activeCategory.widgets.map((widget) => {
                  const isSelected = pendingWidgets[activeCategory.id]?.includes(widget.id) || false;
                  
                  return (
                    <div
                      key={widget.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleToggleWidget(activeCategory.id, widget.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{widget.name}</h3>
                            {isSelected && (
                              <div className="p-1 bg-blue-500 rounded-full">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{widget.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Footer with Submit/Cancel buttons */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWidgetSidebar;
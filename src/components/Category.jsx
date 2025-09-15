import { BarChart3, Gauge, Share2, ShoppingCart, Plus } from 'lucide-react';
import Widget from './Widget';

const iconMap = {
  BarChart3, Gauge, Share2, ShoppingCart
};

const Category = ({ category, selectedWidgets, onRemoveWidget, onAddWidget }) => {
  const IconComponent = iconMap[category.icon] || BarChart3;
  
  const widgetsToShow = category.widgets.filter(widget => 
    selectedWidgets.includes(widget.id)
  );

  if (widgetsToShow.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <IconComponent className="w-6 h-6 text-gray-700" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
        <div className="h-px bg-gray-200 flex-1"></div>
        <button
          onClick={() => onAddWidget(category.id)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Widget</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {widgetsToShow.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => onRemoveWidget(widget.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
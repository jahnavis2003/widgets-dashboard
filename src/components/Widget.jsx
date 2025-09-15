import { 
  TrendingUp, Users, Target, Globe, Cpu, HardDrive, Wifi, Database,
  UserPlus, Heart, MessageSquare, AtSign, DollarSign, Package, 
  Award, Truck, X, BarChart3, Activity
} from 'lucide-react';

const iconMap = {
  TrendingUp, Users, Target, Globe, Cpu, HardDrive, Wifi, Database,
  UserPlus, Heart, MessageSquare, AtSign, DollarSign, Package, 
  Award, Truck, BarChart3, Activity
};

const Widget = ({ widget, onRemove }) => {
  const IconComponent = iconMap[widget.icon] || BarChart3;

  // Generate sample data based on widget type
  const getSampleData = () => {
    switch (widget.id) {
      case 'revenue-chart':
        return { value: '$125,432', change: '+12%', color: 'text-green-600' };
      case 'user-growth':
        return { value: '2,845', change: '+8%', color: 'text-blue-600' };
      case 'conversion-rate':
        return { value: '3.2%', change: '+0.8%', color: 'text-green-600' };
      case 'cpu-usage':
        return { value: '45%', change: 'Normal', color: 'text-green-600' };
      case 'memory-usage':
        return { value: '68%', change: 'Stable', color: 'text-yellow-600' };
      case 'social-followers':
        return { value: '12,847', change: '+234', color: 'text-blue-600' };
      case 'sales-overview':
        return { value: '$45,230', change: '+15%', color: 'text-green-600' };
      default:
        return { value: '0', change: 'N/A', color: 'text-gray-600' };
    }
  };

  const data = getSampleData();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <IconComponent className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{widget.name}</h3>
            <p className="text-sm text-gray-500">{widget.description}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-md transition-all duration-200"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900">{data.value}</div>
          <div className={`text-sm font-medium ${data.color}`}>{data.change}</div>
        </div>
        <div className="h-12 w-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md flex items-center justify-center">
          <Activity className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Widget;
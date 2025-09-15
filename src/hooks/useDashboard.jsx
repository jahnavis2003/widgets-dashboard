import { useState, useEffect } from 'react';
import dashboardData from '../data/widgetsData.json';

export const useDashboard = () => {
  const [data] = useState(dashboardData);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  // Initialize with some default widgets
  useEffect(() => {
    const initialSelection = {
      analytics: ['revenue-chart', 'user-growth'],
      performance: ['cpu-usage', 'memory-usage'],
      social: ['social-followers'],
      ecommerce: ['sales-overview', 'top-products']
    };
    setSelectedWidgets(initialSelection);
  }, []);

  const toggleWidget = (categoryId, widgetId) => {
    setSelectedWidgets(prev => {
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

  const removeWidget = (categoryId, widgetId) => {
    setSelectedWidgets(prev => ({
      ...prev,
      [categoryId]: (prev[categoryId] || []).filter(id => id !== widgetId)
    }));
  };

  return {
    data,
    selectedWidgets,
    toggleWidget,
    removeWidget
  };
};
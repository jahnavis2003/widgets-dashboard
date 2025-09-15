import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  );
}

export default Routing;

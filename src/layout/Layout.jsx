import Header from './layoutComponents/Header'
import { Outlet } from 'react-router'
import Footer from './layoutComponents/Footer'
import './Layout.css';

const Layout = () => {
  return (
    <div className='layout flex flex-col justify-between'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout

import './App.css'
import Routing from './Routing/Routing'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
     <ToastContainer 
        toastClassName={ "bg-stone-900 relative flex p-5 min-h-10 w-auto rounded-md justify-between items-center overflow-hidden cursor-pointer" }
        position="top-right"
        theme="dark"
        pauseOnHover
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
      />
      <Routing />    
    </>
  )
}

export default App;

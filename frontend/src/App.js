import React from 'react';
import HelloWorld from './components/HelloWorld';
import ItemList from './components/ItemList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <HelloWorld />
        <ItemList />
      </div>
    </>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './todo';


function App() {
  return (
    <div className="app">
      <TodoApp />
    </div>
  );
}

// For React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Uncomment this section if using React 17 or earlier
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

export default App;
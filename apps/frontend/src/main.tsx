import { createRoot } from 'react-dom/client';

import { App } from './App';

import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error(
    "Root element not found. Did you forget to add <div id='root'></div> to your index.html?",
  );
}

const root = createRoot(container);
root.render(<App />);

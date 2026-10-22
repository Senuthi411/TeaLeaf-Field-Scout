import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './shell/App';
import '../../../design.css';
import '../../../styles.css';
import './shell/shell.css';

createRoot(document.getElementById('app')!).render(<StrictMode><App /></StrictMode>);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ProvideAuth } from './services/use-auth';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import { ProvideService } from './services/use-service';

ReactDOM.render(
  <BrowserRouter>
    <ProvideAuth>
      <ProvideService>
        <App />
      </ProvideService>
    </ProvideAuth>
  </BrowserRouter>,
  document.getElementById('root')
);


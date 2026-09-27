import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import AuthProvider from '@components/Auth/auth.provider';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <RecoilRoot>
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{vertical:'top',horizontal:'right'}}
          />
          <AuthProvider>
            <App />
          </AuthProvider>
        </RecoilRoot>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

sessionStorage.setItem("money_balance", 100000);
sessionStorage.setItem("buyer_email", "abcd1234@gmail.com");
sessionStorage.setItem("buyer_name", "홍길동");
sessionStorage.setItem("buyer_tel", "010-1111-2222");
sessionStorage.setItem("buyer_addr", "서울특별시 강남구 대치동");
sessionStorage.setItem("buyer_postcode", "01181");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

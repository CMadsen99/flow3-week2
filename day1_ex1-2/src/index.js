import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from './App2Nested';

const info = [
  { id: "rendering", title: "Rendering with React", info: "Hej" },
  { id: "components", title: "components", info: "Med" },
  { id: "props-v-state", title: "Props v. State", info: "Dig" },
  { id: "react-routing", title: "Routing with React Router", info: "!"},
  { id: "react", title: "Lear React", info: "Cool"}
]

ReactDOM.render(
  <React.StrictMode>
    <App info={info} />
  </React.StrictMode>,
  document.getElementById('root')
);

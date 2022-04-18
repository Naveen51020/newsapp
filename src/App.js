import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = ()=> {
  // const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState();

    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
        <Route path="/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="top" country="in" category="top"/>}/> 
          <Route path="business/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" country="in" category="business"/>}/> 
          <Route path="entertainment/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" country="in" category="entertainment"/>}/> 
          <Route path="politics/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="politics" country="in" category="politics"/>}/> 
          <Route path="health/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" country="in" category="health"/>}/>
          <Route path="science/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" country="in" category="science"/>}/> 
          <Route path="sports/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" country="in" category="sports"/>}/> 
          <Route path="technology/*" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" country="in" category="technology"/>}/> 
        </Routes>
        </Router>
      </div>
    )
}

export default App;
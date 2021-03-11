import { useState, useEffect } from 'react'
import './App.css';

function getUrl(path) {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000' + path
  } else {
    return path
  }
}

function App() {
  const [message, setMessage] = useState('End Points')
  useEffect(() => {
    fetch(getUrl('/api/'))
      .then(res => res.json())
      .then(resBody => setMessage(resBody.message))
      .catch(err => {
        debugger
      })
  },[])
  return (
    <div className="App">
      <header className="App-header">
        {message}
        <div>
          <h3>/api/users</h3>
          <h3>/api/users/:id</h3>
        </div>
      </header>
    </div>
  );
}

export default App;

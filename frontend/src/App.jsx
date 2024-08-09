import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/sign-up';
import Home from './pages/home';
import Login from './pages/login';
 

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/sign-up" element={<SignUpPage />} />
                <Route exact path="/login" element={<Login />} />
             </Routes>
        </Router>
    );
}

 

   /* const [jokes, setJokes] = useState([]);

    useEffect(() =>{
      axios.get('/api/jokes')
        .then((response) =>{ 
            setJokes(response.data)})
        .catch((error) => {
           console.error('Error fetching jokes: ', error);
         });
    })


    return (
      <>
        <h1>Starting Backend</h1>
        <p>JOKES :{jokes.length}</p>
        {
          jokes.map((joke, index) => (
            <div key={joke.id}>
              <h3>{joke.title}</h3>
              <p>{joke.content}</p>
            </div>
          ))  
        }
      </>
    ) */


export default App

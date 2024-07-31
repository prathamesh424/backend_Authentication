import express from 'express';


const app = express(); 


app.get('/api/jokes' , (req, res) => {
    const jokes = [
        {id: 1 , title : 'first joke' , content: 'this is firs5t joke'},
        {id: 2 , title : 'first joke' , content: 'this is firs5t joke'},
        {id: 3 , title : 'first joke' , content: 'this is firs5t joke'},
        {id: 4 , title : 'first joke' , content: 'this is firs5t joke'},
        {id: 5 , title : 'first joke' , content: 'this is firs5t joke'}
    ];
    res.send(jokes)
})


const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Server is running on port ${port}`)  // log the port the server is running on
})
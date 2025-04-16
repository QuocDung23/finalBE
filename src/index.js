import express from 'express'
import bodyParser from 'body-parser';
const app = express();
const port = 3000
import { checkIdMiddleware } from './middlewares/checkId.middleware.js';

// create application/json parser
app.use(bodyParser.json());

const users = [
    {
        id: 1,
        name: "A",
        age: 20
    },
    {
        id: 2,
        name: "B",
        age: 15
    },
    {
        id: 3,
        name: "C",
        age: 20
    }
]
//Application-level 
// function logMiddle(req,res,next) {
//     console.log("App-level middleware");
//     next();
// }

// app.use(logMiddle);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users',
    //path middleware
    // (req,res,next) => {
    //     console.log("Get user middleware");
    //     next();
    // } ,
     (req, res) => {
    console.log(req.query);
    const sort = req.query.sort || 'asc';
    console.log(sort);
    
    let sortedUsers = [...users];

    if (sort === "asc") {
        sortedUsers.sort((a, b) => a.id - b.id);
    } else if (sort === "desc") {
        sortedUsers.sort((a, b) => b.id - a.id);
    }

    res.send(sortedUsers);
})

app.get('/users/:id',checkIdMiddleware ,(req, res) => {
    const id = parseInt( req.params.id);
    const user = users.find(user => user.id == id)
    res.send(user);
})

app.put('/users/:id',checkIdMiddleware, (req, res) => {
    const id = parseInt( req.params.id);
    console.log(id);
    const newName = req.body;
    console.log(newName)
    const user = users.find(user => user.id == id)
    
    res.send(user);
})

app.delete('/users/:id', (req, res) => {
    console.log("Delete user Id", req.params.id);
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    users.splice(userIndex, 1);
    res.send(users)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}/`);
  
})
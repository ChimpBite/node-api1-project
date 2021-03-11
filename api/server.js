// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model');

const server = express();

server.use(express.json());

let colors = require('colors');



// GET /api/users
server.get('/api/users', (req, res) => {
    
    User.find()
        .then(users => {
            console.log(colors.yellow('Users', users))
            res.status(200).json(users)
        })
        .catch(err => {// eslint-disable-line
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

// GET /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            console.log(colors.green('User ID', user))
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist"})
            } else {
                res.json(user)
            }
            })
            .catch(err => {// eslint-disable-line
                res.status(500).json({ message: "The user information could not be retrieved"})
            })
        })

// POST /api/users
server.post('/api/users', (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({message: "Please provide name and bio for the user"})
    } else {
        User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {// eslint-disable-line
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
    }

    console.log(colors.blue(newUser))
})

// PUT /api/users/:id
server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body

  try {
    if (!changes.name || !changes.bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
      const updatedUser = await User.update(id, changes)
      if (!updatedUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      } else {
        res.status(200).json(updatedUser)
        
      }
    }
  } catch (err) {
    res.status(500).json({ message: "The user information could not be modified" })
  }
})

// DELETE /api/users/:id
server.delete('/api/users/:id', async (req, res) => {
  try {
    const removed = await User.remove(req.params.id)
    if (!removed) {
      res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
      res.json(removed)
    }
  } catch(err) {
    res.status(500).json({ message: "The user could not be removed" })
  }
})

module.exports = server; 
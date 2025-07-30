const express = require('express')
require('./db/index')
const User = require('./model/user')

const app = express()
app.use(express.json())

// post / create

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// read all
app.get('/users', async (req, res) => {
    const user = await User.find();
    res.status(200).json(user)
})

// find one
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User Not Found' })
        res.json(user)
    } catch (error) {
        res.status(401).json({ error: 'Invalid Format' })
    }
})

// find one and update
app.put('/users/:id', async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!updated) return res.status(404).json({ error: 'User Not Found' })
        res.json(updated)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


// find one and delete
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ err: 'User Not Found' })
        res.json({message: 'User Deleted'})
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID Format' })
    }
})



app.listen(3000, () => {
    console.log('App running on port 3000');

})
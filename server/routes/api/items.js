const express = require('express')
const router = express.Router();

//item model

const Item = require('../../models/Item')

//get
router.get('/', (req, res) => {
    Item.find()
    .sort({ date : -1})
    .then( items => res.json(items))
})

//post
router.post('/', (req, res) => {
    const newItem = new Item({
        name : req.body.name
    })

    newItem.save()
    .then(item => res.json(item))
})

//delete
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then( item => item.remove().then( () => res.json( {success:true})))
    .catch( err => res.status(404).json( {success:false}))
})


module.exports = router ;
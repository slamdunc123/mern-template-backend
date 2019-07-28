const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all items
// @access Public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create an item
// @access Public

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    desc: req.body.desc
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc Delete an item
// @access Public

router.delete('/:id', (req, res) => {
  Item.findOneAndDelete({ _id: req.params.id })
    .then(item => res.send(item))
    .catch(err => res.status(404).json({ success: false }));
});

// @route UPDATE api/items
// @desc Update an item
// @access Public

router.put('/:id', (req, res) => {
  Item.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Item.findOne({ _id: req.params.id }).then(item => {
        res.json(item);
      });
    })
    // .then(item => res.send(item).then(() => res.json({ success: true })))
    // .then(console.log('update detected'))
    .catch(err => res.status(404).json({ success: false }));
});
// router.route('/:id').put((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(item => {
//       item.username = req.body.username;
//       // exercise.description = req.body.description;
//       // exercise.duration = Number(req.body.duration);
//       // exercise.date = Date.parse(req.body.date);

//       exercise
//         .save()
//         .then(() => res.json('Item updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;

const router = require("express").Router();
require("dotenv").config();
const Book = require("../models/books.js");
const cors = require("cors")

router.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

router.use(cors())

router.get("/", (req, res) => {
  Book
    .find()
    .limit(40)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

router.post("/", (req, res) => {
  Book
    .create(req.body)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error.");
    });
});

router.get("/:id", (req, res) => {
  Book
    .findById(req.params.id)
    .then((book) => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  Book
    .findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((book) => {
      res.redirect(`/books/${req.params.id}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Book
    .findByIdAndDelete(req.params.id)
    .then((book) => {
      if (book) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

const db = require("../models");
module.exports = router;
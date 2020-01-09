const express = require("express");
const router = express.Router();
const Place = require("../models/place");

router.get("/", (req, res, next) => {
  res.render("/");
});

router.post("/", (req, res, next) => {
  let location = {
    type: "Point",
    coordinates: [req.body.latitude, req.body.longitude]
  };

  const newPlace = new Place ({ 
    name: req.body.name,
    type: req.body.type,
    location: location
  });

  newPlace.save(error => { //usei o save pq eu já instanciei com o new Place, se não poderia ter usado o .create()
    if (error) {
      next(error);
    } else {
      res.redirect("/");
    }
  });
});

router.get('/api', (req, res, next) => { //rota do back para retornar os json (dados) no front com axios
  Place.find()
  .then(places => res.json(places))
  .catch(err => console.log(err))
}) //endpoint API 

module.exports = router;

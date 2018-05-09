const router = require("express").Router();
const blackwoodService = require("./blackwood.service");

router.get("/:id([0-9a-fA-F]{24})", function(req, res) {
  blackwoodService.read(req.params.id).then(result => {
    res.status(200).json(result);
  });
});

router.get("/", function(req, res) {
  blackwoodService.readAll().then(result => {
    res.status(200).json(result);
  });
});

router.put("/:id([0-9a-fA-F]{24})", function(req, res) {
  blackwoodService.update(req.params.id, req.body).then(result => {
    res.status(200).json(result);
  });
});

router.post("/", function(req, res) {
  blackwoodService.create(req.body).then(result => {
    res.status(200).json(result[0]);
  });
});

router.delete("/:id([0-9a-fA-F]{24})", function(req, res) {
  blackwoodService.delete(req.params.id).then(result => {
    res.status(200).json(result);
  });
});

module.exports = router;

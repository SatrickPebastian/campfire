const router = require("express").Router();
var fs = require("fs");

router.get("/:application_name", (req, res) => {

  const filename = "./debians/" + req.params.application_name + ".deb"
  fs.access(filename, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("File not found");
    } else {
      const fileStream = fs.createReadStream(filename);
      fileStream.pipe(res);
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const applications = [
      {
        name: "saugen",
        version: "0.1",
      },
      {
        name: "saugen",
        version: "0.2",
      },      {
        name: "welding",
        version: "0.1",
      },
    ];
    res.send(applications);
  } catch (ex) {
    res.status(400).send(ex.errors.message);
  }
});
module.exports = router;

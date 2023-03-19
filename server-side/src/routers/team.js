const express = require("express");
const Team = require("../models/team.js");

const router = new express.Router();

router.post("/api/team", async function (req, res) {
  const teamObj = new Team({
    ...req.body,
  });

  try {
    await teamObj.save();
    res.status(201).send(teamObj);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/teams", async function (req, res) {
  try {
    Team.find({}).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/team/:identifier", async function (req, res) {
  const _id = req.params.identifier;

  try {
    const teamObj = await Team.findOne({ _id });

    if (!teamObj) {
      return res.status(404).send("Team don't found");
    }

    res.status(200).send(teamObj);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/api/team/:identifier", async function (req, res) {
  try {
    const deletedTeam = await Team.findOneAndDelete({ _id: req.params.identifier });

    if (!deletedTeam) {
      return res.status(404).send("Team doesn't found!");
    }

    res.status(200).send(deletedTeam);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

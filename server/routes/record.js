const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const { ObjectId } = require("mongodb");

// Get a list of all records
recordRoutes.route("/record").get(async function (req, res) {
    const db_connect = dbo.getDb();
    try {
        const result = await db_connect.collection("records").find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching records:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    try {
        const result = await db_connect.collection("records").findOne(myquery);
        if (!result) {
            return res.status(404).json({ message: "Record not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching record by ID:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Create a new record
recordRoutes.route("/record/add").post(async function (req, res) {
    const db_connect = dbo.getDb();
    const { name, position, level } = req.body;

    // Input validation
    if (!name || !position || !level) {
        return res.status(400).json({ message: "Name, position, and level are required" });
    }

    const myobj = { name, position, level };
    try {
        const result = await db_connect.collection("records").insertOne(myobj);
        console.log("1 document created");
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating record:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Update a record by id
recordRoutes.route("/record/:id").put(async function (req, res) {
    const db_connect = dbo.getDb();
    const { name, position, level } = req.body;

    // Input validation
    if (!name || !position || !level) {
        return res.status(400).json({ message: "Name, position, and level are required" });
    }

    const myquery = { _id: new ObjectId(req.params.id) };
    const newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };

    try {
        const result = await db_connect.collection("records").updateOne(myquery, newvalues);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Record not found" });
        }
        console.log("1 document updated");
        res.status(200).json(result);
    } catch (error) {
        console.error("Error updating record:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// Delete a record by id
recordRoutes.route("/record/:id").delete(async function (req, res) {
    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };

    try {
        const result = await db_connect.collection("records").deleteOne(myquery);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Record not found" });
        }
        console.log("1 document deleted");
        res.status(200).json({ message: "Record successfully deleted" });
    } catch (error) {
        console.error("Error deleting record:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = recordRoutes;

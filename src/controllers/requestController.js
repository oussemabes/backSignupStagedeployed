const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../config");
app.use(express.static("./public"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//const Axios = require("axios");




async function Display(req, res) {
    console.log("page", req.query.page, "limit", req.query.limit);
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const query = `SELECT * FROM requests ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}`;
    try {
        await db.query(query, (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ error: "Error retrieving data from the database" });
    }
}

async function createRequest(req, res) {
    // validate request body


    const data = [req.body.ref, req.body.study_id, req.body.connection_id, req.body.state, req.body.date];
    console.log(data)
    const sql = "INSERT INTO requests (ref,study_id,connection_id,state,date) VALUES (?,?,?,?,?)";

    await db.query(sql, data, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send("Error inserting user into the database");
        }
        res.status(200).send("request registered successfully");
    });

}

async function updateRequestState(req, res) {
    const { ref, study_id, id } = req.params;


    try {
        const updateQuery = "UPDATE requests SET state = ? WHERE ref = ? AND study_id= ? AND id=?";
        console.log(req.body.state)
        await db.query(updateQuery, [req.body.state, ref, study_id, id]);

        res.status(200).json({ message: "request state updated successfully" });
    } catch (error) {
        console.error("Error updating request state:", error);
        res.status(500).json({ error: "Failed to update participant state" });
    }
}
async function countRequests(req, res) {
    try {
        const getCount = "SELECT COUNT(*) as count FROM requests";
        await db.query(getCount, (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ error: "Error retrieving data from the database" });
    }
}
async function countAcceptedRequest(req, res) {

    try {
        const getCount = `SELECT COUNT(*) as count FROM requests WHERE state="sent"`;
        await db.query(getCount, (err, result) => {
            if (err) {
                throw err;
            }
            res.send(result);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ error: "Error retrieving data from the database" });
    }
}
module.exports = {
    Display,
    createRequest,
    updateRequestState,
    countRequests,
    countAcceptedRequest
};  
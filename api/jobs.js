const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jsonParser = bodyParser.json();
const db = require("../db");
const { tokenv, jobv } = require('../middleware');


router.get('/jobs/list', tokenv(), function (req, res) {

    async function main() {
        try {

            var step1 = await getjoblist();

            res.status(200).json({
                record: step1
            });

            console.info("/jobs/list -- DONE")

        } catch (error) {
            console.log(error)
            res.status(500);
        }
    }

    main();


    function getjoblist() {
        return new Promise((resolve, reject) => {
            try {
                db.query("SELECT * FROM jobs WHERE JobStatus = 'Active' ORDER BY CreatedDateTime DESC", function (err, results) {
                    if (err) {
                        console.log(err)
                        reject(err);
                    } else {
                        resolve(results)
                    }
                });
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }

});

router.post('/jobs/create', tokenv(), jobv(), function (req, res) {
    async function main() {
        try {

            req.body.JobStatus = "Active";
            var step1 = await createjob(req.body);

            if (step1) {
                res.status(200).send();
                console.info("/jobs/create -- DONE")
            }
        } catch (err) {
            console.log(err)
            res.status(500).send();
        }
    }

    main();


    function createjob(body) {
        return new Promise((resolve, reject) => {
            try {
                db.query("INSERT INTO jobs(JobTitle,JobLocation,JobDescription,JobStatus) VALUES (?,?,?,?)", [body.JobTitle, body.JobLocation, body.JobDescription, body.JobStatus], function (err, results) {
                    if (err) {
                        console.log(err)
                        reject(err);
                    } else {
                        resolve(results)
                    }
                });
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }

});


module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "item";`;
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('error in item GETTER', err);
    })
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
        const queryText = 'INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1, $2, $3)';
        const queryArguments = [req.body.description, req.body.image_url, req.user.id]
        pool.query(queryText, queryArguments)
            .then(() => res.sendStatus(201))
            .catch(() => res.sendStatus(500));
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    const querySelect = `SELECT "user_id" FROM "item" WHERE "id" = $1;`;
    pool.query(querySelect, [req.params.id])
        .then((response) => {
            if (response.rows[0].user_id === req.user.id){
                const queryText = `DELETE FROM "item" WHERE "id" = $1`
                pool.query(queryText, [req.params.id])
                .then(() => {
                    res.sendStatus(200)
                })
                .catch((err) => {
                    console.log('err in delete query', err);
                    res.sendStatus(500)
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(403)
        })
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;
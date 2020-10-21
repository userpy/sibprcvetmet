const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Record = require('../models/Record');
const crypto =  require('crypto')
const TOKEN_SECRET= crypto.randomBytes(64).toString('hex')
const jwt_decode = require("jwt-decode");

function authenticateToken(role) {
    let fmt = role;
    return (req, res, next) => {
        console.log(`-------${fmt}`)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401); // if there isn't any token

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            console.log(err);
            if (err) return res.sendStatus(403);
            req.user = user;
            next() // pass the execution off to whatever request the client intended
        })
    }
}


function generateAccessToken(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '1800s' });
}

router.post('/creteNewUser', (req, res) => {
    const token = generateAccessToken({ username: req.body.username, role: ['bar','adm','rec'] });
    var decoded = jwt_decode(token);
    console.log(decoded);
    res.json({token:token});
});


router.get('/',async (req, res) => {
            console.log('get in records');
            res.json(await Record.find());
});



router.post('/', async (req, res) => {

            const record = new Record(req.body);
            await record.save();
            res.json({state: 'success'});
});

router.get('/:id', async (req, res) => {
           res.json(await Record.findById(req.params.id));
});
router.put('/:id', async (req, res) => {
            await Record.findByIdAndUpdate(req.params.id, req.body);
            res.json({state: 'updated'});
});
router.delete('/:id', async (req, res) => {
            await Record.findByIdAndRemove(req.params.id);
            res.json({state: 'deleted'});
         });





module.exports = router;

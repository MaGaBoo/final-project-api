const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('holi, soy la home');
    res.status(200).json({ ok: true });
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const path = require('path');



app.set('port', 3000);
mongoose.connect('mongodb://mongo:27017/mevn-course', { useNewUrlParser: true })
    .then(db => console.log('[OK] DB is connected'+ db))
    .catch(err => console.error(err));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.listen(app.get('port'), () => {
           console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});




app.use('/api/records', require('./routes/records'));
app.use('/', express.static(path.join(__dirname, './dist')));
app.use('/*', express.static(path.join(__dirname, './dist')));

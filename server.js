const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Network',
 { 
     useFindAndModify: false,
     useNewUrlParser: true,
    useUnifiedTopology: true
    });

    mongoose.set('debug', true);

    app.listen(Port, () => {
        console.log(`Server is running on Port ${Port}`);
    });

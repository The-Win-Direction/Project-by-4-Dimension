const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');
const authRoutes=require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send("Welcome to Hackfornepal Backend ");
});

///////////////



// const uploadRoute = require('./routes/uploadRoute');


// app.use('/api', uploadRoute);

////////////////

const khetRoutes = require('./routes/khetRoutes');
app.use('/api/khets', khetRoutes);

const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);



/////////////////


// API Routes
app.use('/api/auth/', authRoutes);


app.use((req, res) => {
  res.status(404).send('Sorry, this route does not exist.');
});

app.use(errorHandler);
module.exports = app;

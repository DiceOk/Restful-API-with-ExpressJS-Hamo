const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');



// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
  })
);

// Restpage Route
app.get('/newHtml', function (req, res) {
  res.render('newHtml', {
      title:'Member App',
      members
  });
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
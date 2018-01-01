const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const uitl = require('./library/util');
const app = express();
const uitl = require('./library/util');

// DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/boards');

// Router
// const events = require('./routes/events');
// const proposals = require('./routes/proposals');
// const publications = require('./routes/publications');
const tasks = require('./routes/task');
const login = require('./routes/login');

//use for production environment
const routers = {
    frontend: express.static('../frontEnd/dist'),
    manage: express.static('../manage/dist'),
};

const dataRouters = {
    // proposals: proposals,
    // publications: publications,
    // highlights:  highlights,
    user:login,
    tasks:tasks
}

// app.use(devMiddleware);
// app.use(express.static(__dirname+'/'));

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Routing

for(let key in dataRouters) {
    console.log(key);
    console.log(dataRouters[key]);
    app.use('/api/' + key, dataRouters[key]);
}
//


// app.use('/highlights/*', dataRouters.highlights);

app.use('/manage/*', uitl.basicAuth('cisco', 'cisco123'));


// Listening
app.listen(8009, () => {
    console.log('listening');
})
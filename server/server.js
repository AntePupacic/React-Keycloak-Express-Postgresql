let express = require('express');
let session = require('express-session');
let Keycloak = require('keycloak-connect');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require('./queries');

let app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));


const server = app.listen(5000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

let memoryStore = new session.MemoryStore();

app.use(session({
    secret: 'any_key',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

let keycloak = new Keycloak({
    store: memoryStore,
});

app.use(keycloak.middleware());

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.get('/users/data/:username', keycloak.protect('user'), db.getUserCoursesByUsername);
app.get('/users/grade/:username', keycloak.protect('user'), db.getUserGradesByUsername);
app.get('/admin/data/:username', keycloak.protect('admin'), db.getAdminCoursesByUsername);
app.get('/admin/students/:username', keycloak.protect('admin'), db.getAdminStudentsByUsername);
app.put('/admin/students/:id', keycloak.protect('admin'), db.updateStudentGrade);











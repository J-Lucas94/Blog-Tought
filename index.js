const express = require("express");

//handlebars
const exphbs = require("express-handlebars");

//sessions
const session = require("express-session");
const fileStore = require("session-file-store")(session);

//flash mesagens
const flash = require("express-flash");

const app = express();

//banco de dados
const db = require("./db/db");

//Models

const Tought = require('./models/Tought');
const User = require('./models/User');



//Import controller
const toughtsController = require("./controllers/ToughtController");

//template
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//resposta do body(corpo)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session middleware
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
      logFn: function () {},
      path: require('path').join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now()+360000),
    }
  }),
);

//flash messages
app.use(flash())

//public path
app.use(express.static('public'))

//set session to res
app.use((req, res, next)=>{

    if(req.session.userid){
        res.locals.session = req.session
    }

    next()

})

//Import Routes

const toughtsRoutes = require('./routes/toughtRoutes');
const authRoutes = require('./routes/authRoutes');

//Routes

app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', toughtsController.showToughts)


db.sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

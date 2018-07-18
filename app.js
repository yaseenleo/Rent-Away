var fs = require("fs");
var express = require("express");
var http = require("http");
var https = require("https");
var passport = require('passport');
var auth = require('./auth');
const nodemailer = require('nodemailer');
var path = require("path");
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

// your express configuration here


// var formidable = require("formidable");
var sessions = require("express-session");
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyAHDeQsOYYGJsxpteeRbGPZHAqgEOih9h8",
    authDomain: "quizapp1-a28b4.firebaseapp.com",
    databaseURL: "https://quizapp1-a28b4.firebaseio.com",
    projectId: "quizapp1-a28b4",
    storageBucket: "quizapp1-a28b4.appspot.com",
    messagingSenderId: "351903158212"
}
config2 = {
    apiKey: "AIzaSyA7rfBhIutZdEG0R7xANM3Wy27lV7GP2-Q",
    authDomain: "yaseen-site.firebaseapp.com",
    databaseURL: "https://yaseen-site.firebaseio.com",
    projectId: "yaseen-site",
    storageBucket: "yaseen-site.appspot.com",
    messagingSenderId: "1093689830600"
};
firebase.initializeApp(config);

//var url = "mongodb://rapshek:natsikap1@ds263590.mlab.com:63590/cinstagram";

var bodyParser = require("body-parser");
var app = express();
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());
app.set("views", path.join(__dirname, "/public-2"))
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public-2")))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessions({
    secret: 'ddfd344f4dud8d8d8d8j',
    resave: false,
    saveUninitialized: true
}));
auth(passport);
app.use(passport.initialize());

var datajson = [{ "id": "53232", "img": "images/dress-1.jpg", "title": "Red Dress (b-223)", "price": "2500 Rs", "owner": "rapshek@gmail.com" },
{ "id": "55567", "img": "images/dress-2.jpg", "title": "pink dress long (c-231)", "price": "3000 Rs", "owner": "hasanabid992@gmail.com" },
{ "id": "44545", "img": "images/dress-3.jpg", "title": "Stylish Red sleeveless (s-234)", "price": "4500 Rs", "owner": "rapshek@gmail.com" }]
var email = "";
var issigned = false;
app.get("/", (req, res) => {

    res.render("home", { data: datajson, issigned: issigned, email: email });

});
app.get("/login-signup", (req, res) => {
    res.render("loginandsignup", { issigned: issigned, email: email });
})
app.get("/rent", (req, res) => {
    let id = req.query.id;
    let size = req.query.size;

    let data;

    for (var i = 0; i < datajson.length; i++) {
        if (datajson[i].id == id) {
            data = datajson[i];
        }
    }
    res.render("checkproduct", { id: id, data: data, size: size });
})
app.post("/checkout", (req, res) => {
    let fname = req.body.fname;
    let contact = req.body.contact;
    let address = req.body.address;
    let id = req.body.id;
    let size = req.body.size;
    let data;

    for (var i = 0; i < datajson.length; i++) {
        if (datajson[i].id == id) {
            data = datajson[i];
        }
    }
    let mailtoOwner = {
        from: 'RentMine <rapshek@gmail.com>', // sender address
        to: data.owner, // list of receivers
        subject: 'Your Cloth is Rented', // Subject line
        text: "Hello", // plain text body
        html: `<p>Your cloth (` + data.title + `) is on rent...</p>
        <p>Our rider will collect it shortly from you</p>`// html body
    };
    let mailtoClient = {
        from: 'NEURAL CONTACT <rapshek@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Your Order Is Placed', // Subject line
        text: "Hello", // plain text body
        html: '<p>YOUR ORDER WILL BE DISPATCH SHORTLY...</p>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailtoClient, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    transporter.sendMail(mailtoOwner, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    res.redirect("/");

})
app.get("/product-details", (req, res) => {
    var id = req.query.id;

    for (var i = 0; i < datajson.length; i++) {
        if (datajson[i].id == id) {
            res.render("product-details", { data: datajson[i], email: email, issigned: issigned });
        }
    };
    //     if(!issigned)
    //     {
    //         res.render("404");
    //     }
    //     else
    //     {
    //     var id = req.query.id;

    //     for(var i=0;i<datajson.length;i++){
    //         if(datajson[i].id==id){
    //         res.render("product-details",{data:datajson[i],email:email,issigned:issigned});
    //         }
    //     }
    //     res.render("404");
    //    } 

});
var something;

app.get("/etc", (req, res) => {
    res.end(something);
})
app.get("/logout", (req, res) => {
    req.logout();
    req.session = null;
    email = null;
    issigned = false;

    firebase.auth().signOut().then(function () {
        res.redirect("/");
    }).catch(function (error) {
        console.log(error);
    });
})
app.post("/signin", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {

        res.redirect("/authenticating");
    });

})
app.post("/signup", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        res.redirect("/");
    }).catch((e) => {
        var errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
            res.render("404");

        }
        else if (errorCode === "auth/weak-password") {
            res.render("404");
        }
    })
})
app.get("/authenticating", (req, res) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            email = user.email;
            issigned = true;
            var uid = user.uid;
            res.redirect("/");

            // ...
        } else {
            issigned = false;
            res.redirect("/");

        }
    });

})







// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "rapshek@gmail.com", // generated ethereal user
        pass: "natsikap1" // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'NEURAL CONTACT <no-reply@neuralstack.com>', // sender address
    to: 'rapshek@gmail.com,', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello worldsdsdsdswdd?', // plain text body
    html: '<b>Helldsdssddso world?</b>' // html body
};

// firebase facebook login
app.get("/signin-with-fb", (req, res) => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    //
})
app.get("/signin-with-google", (req, res) => {

})

//passport google
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.profile.emails.read']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        req.session.token = req.user.token;
        var array = {};
        array = req.user.profile;
        // email = array.emails[0].value;
        email = array.displayName;
        issigned = true;
        res.redirect("/");
        // res.write(req.session.token);
        console.log(array);


    }
);
//
app.listen(9000, () => {
    console.log("server is running on port 9000");
})

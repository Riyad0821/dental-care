// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config()

// //const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.is4kq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdaie.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const port = 5000

// const app = express()

// app.use(bodyParser.json());
// app.use(cors());


// app.get('/', (req, res) => {
//     res.send('Doctors Portal Database is Running!!')
// })


// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const appointmentCollection = client.db("doctorsPortalDB").collection("appointments");

//     console.log('doctors portal db connected successfully!!');

//     // post appointment to server
//     app.post('/addAppointment', (req, res) => {
//         const appointment = req.body;
//         appointment.status = "pending";
//         appointment.prescription = null;
//         console.log(appointment);

//         appointmentCollection.insertOne(appointment)
//             .then((result) => {
//                 res.send(result.insertedCount > 0)
//             })
//     })

//     // read all appointments data from database
//     app.get('/appointments', (req, res) => {
//         appointmentCollection.find()
//             .toArray((err, documents) => {
//                 res.send(documents)
//             })
//     })

//     app.post('/updateStatus', (req, res) => {
//         let appointment = req.body;
    
//         client = new MongoClient(uri, { useNewUrlParser: true });
//         client.connect(err => {
//             let collection = client.db("patientsDetails").collection("appointments");
//             collection.updateOne({ _id: ObjectId(appointment.id) }, { $set: { "status": appointment.status } },
//                 (err, result) => {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).send({ message: err })
//                     }
//                     else {
//                         res.send(result);
//                         console.log(result);
//                     }
//                 });
//             client.close();
//         });
//     });



// });




// app.listen(process.env.PORT || port, console.log('Database Running on Port', port))






















const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// const uri = process.env.DB_PATH;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdaie.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// let client = new MongoClient(uri, { useNewUrlParser: true });

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Get
app.get('/', (req, res) => {
    res.send('<a href="/appointments">Appointments</a>');
});

// read all appointments data from database
// done
app.get('/appointments', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("patientsDetails").collection("appointments");
        collection.find().toArray((err, documents) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err });
            } else {
                res.send(documents);
            }
        });
        client.close();
    });
});

// Post appointment to server
// done
app.post('/addAppointment', (req, res) => {
    const appointment = req.body;
    appointment.status = "pending";
    appointment.prescription = null;

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("patientsDetails").collection("appointments");
        collection.insertOne(appointment, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err });
            } else {
                res.send(result.ops[0]);
            }
        });
        client.close();
    });
});



app.post('/updatePrescription', (req, res) => {
    const appointment = req.body;

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("patientsDetails").collection("appointments");
        collection.updateOne({ _id: ObjectId(appointment.id) }, { $set: { "prescription": appointment.prescription } }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: err })
            }
            else {
                res.send(result);
                console.log(result);
            }
        });
        client.close();
    });
});

app.post('/updateStatus', (req, res) => {
    const appointment = req.body;

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("patientsDetails").collection("appointments");
        collection.updateOne({ _id: ObjectId(appointment.id) }, { $set: { "status": appointment.status } },
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: err })
                }
                else {
                    res.send(result);
                    console.log(result);
                }
            });
        client.close();
    });
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening to port ${port}`));
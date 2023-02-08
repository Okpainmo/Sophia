require('dotenv').config();

// mongoose waiter model
const waiterModel = require('./models/waiter');

// cors(cross origin resource sharing)
const cors = require('cors');

// node-mailer
const nodemailer = require('nodemailer');

const express = require('express');
const app = express();

// connect DB
const dbConnector = require('./db/connector');

// express middleware for handling json data in post-requests
app.use(express.json());

// use cors
app.use(cors());

// pre-routes
app.get('/', (req, res) => {
  res.status(200).send('app is live');
});

app.post('/join-waitlist', async (req, res) => {
  const waitlistWaiter = await waiterModel.create(req.body);

  const { name, email } = req.body;

  const waiterName = name;
  const waiterEmail = email;
  const singleWaiterName = waiterName.split(' ')[0];

  const transporter = nodemailer.createTransport({
    service: process.env.ADMIN_EMAIL_SERVICE,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    to: waiterEmail,
    subject: 'Welcome to Sophia',
    html: `<p>Hello ${singleWaiterName}, <br/> we're so glad to have you on the Sophia waitlist. <br/>
    Now that you're onboard, please do look out for updates because you'll be among
    the very first people to know about our updates once they go public. <br/>We'll also
    appreciate your feedbacks on our updates whenever we release them.<br/><br/>

    Thanks a lot. <br/>
    <strong>SophiaHQ</strong>`,
  };

  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err);
      res.status(400).json({ waitlistWaiter, requestStatus: 'failed' });
    } else {
      res.status(201).json({ waitlistWaiter, requestStatus: 'success' });
      console.log('Email sent successfully');
    }
  });
});

// serve
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConnector(process.env.MONGO_DB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

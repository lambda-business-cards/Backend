const express = require('express');
const bcrypt = require('bcrypt');
const multipart = require('connect-multiparty')();

const { generateToken, authenticate } = require('../common/authentication');
const db = require('../data/db');

const server = express.Router();

server.post('/register', multipart, async (req, res) => {

  console.log('they hit me yo');

  let { username, password, email, phone } = req.body;

  if (!username) {

    res.status(400).json({message: 'no username provided'});
    return;

  }

  if (!password) {

    res.status(400).json({message: 'no password provided'});
    return;

  }

  if (!email) {

    res.status(400).json({message: 'no email provided'});
    return;

  }

  if (!phone) {

    res.status(400).json({message: 'no phone number provided'});
    return;

  }

  if (phone.length !== 11) {

    res.status(400).json({message: 'invalid phone number format!'});
    return;

  }

  phone = `${phone[0]} (${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(7)}`;

  try {

    password = await bcrypt.hash(password, 1);

    await db.insert({ username, password, email, phone }).into('users');
    const user = await db.select('u.username', 'u.password', 'u.id', 'u.email').from('users as u').where('username', username).first();

    const token = await generateToken(user);

    res.status(201).json({
      user_id: user.id,
      username: user.username,
      token
    });

  }

  catch (err) {

    const withName = await db.select().from('users').where({ username }).first();
    const withEmail = await db.select().from('users').where({ email }).first();
    const withPhone = await db.select().from('users').where({ phone }).first();

    if (withName || withEmail || withPhone) {

      res.status(400).json({message: 'Duplicate name, email, or phone!'});

    }

    else {

      res.status(500).json({message: 'internal server error'});

    }

  }

});

server.post('/login', async (req, res) => {

  const { username, password } = req.body;

  if (!username) {

    res.status(400).json({message: 'no username provided'});
    return;

  }

  if (!password) {

    res.status(400).json({message: 'no password provided'});
    return;

  }

  try {

    const user = await db.select('u.username', 'u.password', 'u.id').from('users as u').where('username', username).first();

    if (user) {

      const correct = await bcrypt.compare(password, user.password);

      if (correct) {

        const token = await generateToken(user);

        res.status(200).json({
          user_id: user.id,
          username: user.username,
          token
        });

      }

    }

    res.status(401).json({message: 'Invalid credentials'});

  }

  catch (err) {

    res.status(500);

  }

});

/*server.post('/passwordreset', async (req, res) => {

  const { email } = req.body;

  try {

    const user = await db.select().from('users').where({ email }).first();

    if (!user) {

      res.status(404).json({message: 'User not found!'});
      return;

    }

    let password = randomstring.generate(8);
    let hashed = await bcrypt.hash(password, 1);
    await db.update('password', hashed).from('users').where({id: user.id});

    const smtpTransport = mailer.createTransport({
      service: "Gmail",
      auth: {
          user: "usemytoolsemailer@gmail.com",
          pass: "usemytools42069"
      }
    });

    var mail = {
        from: "Use My Tools <usemytoolsemailer@gmail.com>",
        to: user.email,
        subject: "Password Reset",
        text: `We've reset your password! Your new password is: ${password}. Please change it as soon as you can!`
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
            res.status(500).json({message: 'Email did not send'});
        }else{
            console.log("Message sent!");
        }

        smtpTransport.close();
    });

    res.status(200).json({message: "email sent"});

  }

  catch (err) {

    console.log(err);
    res.status(500).json({message: 'error'});

  }

});*/

module.exports = server;

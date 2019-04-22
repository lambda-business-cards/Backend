const express = require('express');
const QRCode = require('qrcode');

const { authenticate } = require('../common/authentication');
const { uploadImage } = require('../common/cloudinary');

const db = require('../data/db');

const server = express.Router();

server.get('/', authenticate, async (req, res) => {

  const user_id = req.decoded.subject;

  try {

    const data = await db.select().from('business_cards').where({ user_id });

    res.status(200).json(data);

  }

  catch (err) {

    console.log(err);
    res.status(500).json({message: 'internal server error'});

  }

});

server.post('/', authenticate, async (req, res) => {

  const user_id = req.decoded.subject;

  const { business_name, contact_name, email, phone, img_url, address, fax, web_url } = req.body;

  if (!business_name) {

    res.status(400).json({message: 'No business name supplied!'});
    return;

  }

  if (!email) {

    res.status(400).json({message: 'No email supplied!'});
    return;

  }

  try {

    await db.insert({ business_name, contact_name, email, phone, img_url, address, fax, web_url, user_id }).into('business_cards');

    let id = await db.select('id').from('business_cards').where({ email, business_name, contact_name, user_id }).first();

    id = id.id;

    const img = await QRCode.toDataURL(`${id}`);

    const qr_url = await uploadImage(img);

    await db('business_cards').update({ qr_url }).where({ id });

    res.status(200).json({message: 'Success!'});

  }

  catch (err) {

    console.log(err);
    res.status(500).json({message: 'internal server error'});

  }

});

server.post('/add', authenticate, async (req, res) => {

  res.status(200).json({message: 'coming soon to theaters'});

});

module.exports = server;

const express = require('express');
const QRCode = require('qrcode');

const { authenticate } = require('../common/authentication');
const { uploadImage } = require('../common/cloudinary');

const db = require('../data/db');

const server = express.Router();

server.get('/', authenticate, async (req, res) => {

  const user_id = req.decoded.subject;

  try {

    const created = await db.select().from('business_cards').where({ user_id });
    const saved = await db.select('c.*', 'uc.comment').from('business_cards as c').join('user_cards as uc', 'uc.card_id', 'c.id').where('uc.user_id', user_id);

    res.status(200).json({
      created, saved
    });

  }

  catch (err) {

    console.log(err);
    res.status(500).json({message: 'this server be trippin'});

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

    res.status(201).json({message: 'Success!'});

  }

  catch (err) {

    console.log(err);
    res.status(500).json({message: 'dis server be trippin'});

  }

});

server.post('/save', authenticate, async (req, res) => {

  const user_id = req.decoded.subject;
  const { card_id, comment } = req.body;

  if (!card_id) {

    res.status(400).json({message: 'No card id provided!'});
    return;

  }

  const card = db.select().from('cards').where({ id: card_id }).first();

  if (!card) {

    res.status(404).json({message: 'card not found!'});
    return;

  }

  await db.insert({ user_id, card_id, comment }).into('user_cards');

  res.status(201).json({message: 'success!'});

});

server.put('/:id', authenticate, async (req, res) => {

  const { business_name, contact_name, email, phone, img_url, address, fax, web_url } = req.body;

  if (!(business_name || contact_name || email || phone || img_url || address || fax || web_url)) {

    res.status(400).json({ message: 'Send me some actual data homie' });
    return;

  }

  if (!(business_name || contact_name || email)) {

    res.status(400).json({ message: 'I needs myself some names and emails, yo'});
    return;

  }

  let card;

  try {

    card = await db.select().from('business_cards').where('id', req.params.id).first();

  }

  catch (err) {

    console.log(err);
    res.status(500).json({ message: 'dis server be trippin yo'});
    return;

  }

  if (!card) {

    res.status(404).json({ message: 'dis card dont exist yet brotha' });
    return;

  }

  if (card.user_id !== req.decoded.subject) {

    res.status(403).json({ message: 'You dont own this card my dude' });
    return;

  }

  try {

    await db('business_cards').update({ business_name, contact_name, email, phone, img_url, address, fax, web_url }).where('id', req.params.id);

  }

  catch (err) {

    res.status(500).json({ message: 'something funnys going on over here'});
    return;

  }

  res.status(200).json({ message: 'Success!' });

});

server.delete('/:id', authenticate, async (req, res) => {

  const id = req.params.id;

  let card;

  try {

    card = await db.select().from('business_cards').where({ id }).first();

  }

  catch (err) {

    res.status(500).json({message: 'somethings going wrong son'});
    return;

  }

  if (!card) {

    res.status(404).json({ message: 'card not found' });
    return;

  }

  if (card.user_id !== req.decoded.subject) {

    res.status(403).json({ message: 'You dont own this card my man' });
    return;

  }

  try {

    await db('user_cards').where('card_id', req.params.id).del();
    await db('business_cards').where('id', req.params.id).del();

  }

  catch (err) {

    console.log('error bros');
    res.status(500).json({ message: 'whoever wrote this backend effed up. Oh wait, I wrote the backend. Dang it.'});
    return;

  }

  res.status(200).json({ message: 'we good yo'});

});

module.exports = server;

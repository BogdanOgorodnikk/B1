const express = require('express');
const router = express.Router();

const models = require('../models');


router.post('/:product', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
      const title = req.body.title.trim().replace(/ +(?= )/g, '');
      const characteristic = req.body.characteristic.trim().replace(/ +(?= )/g, '');
      const number = req.body.number.trim().replace(/ +(?= )/g, '');
      const price = req.body.price.trim().replace(/ +(?= )/g, '');
      const pledge = req.body.pledge.trim().replace(/ +(?= )/g, '');
      const client = req.body.client;
      const owner = req.body.owner;

    if(!title) {
        res.json({
            ok: false,
            error: 'Поле "Назва товару" повине бути заповненим!',
            fields: ['title']
          });
      } else if (title.length < 1 || title.length > 64) {
        res.json({
          ok: false,
          error: 'Довжина назви таблиці від 1 до 64 символів!',
          fields: ['title']
        });
      } else if (owner != userId) {
        res.json({
          ok: false,
          error: 'Ви не власник',
          fields: ['owner']
        });
      } else {
        models.Product.create({        //Створення поста
            title,
            characteristic,
            number,
            price,
            pledge,
            debt: price*number,
            debts: (price*number)-pledge, 
            client,
            owner
        }).then(product => {
            console.log(product);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(err);
            console.log(product);
            res.json({
            ok: false
          }); 
        });
      }  
    }
});


module.exports = router;
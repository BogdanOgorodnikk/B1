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

    if(!title) {
        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields: ['login', 'password', 'passwordConfirm']
          });
      } else if (title.length < 3 || title.length > 32) {
        res.json({
          ok: false,
          error: 'Длина заголовка от 3 до 32 символов!',
          fields: ['title']
        });
      } else {
        models.Product.create({        //Створення поста
            title,
            characteristic,
            number,
            price,
            pledge,
            debt: price*number,
            client
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
const express = require('express');
const router = express.Router();

const models = require('../models');


router.post('/:table', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
      const headline = req.body.headline.trim().replace(/ +(?= )/g, '');
      const debt = req.body.debt;
      const post = req.body.post;
      const owner = req.body.owner;

    if(!headline) {
        res.json({
            ok: false,
            error: 'Всі поля повинні бути заповнені!',
            fields: ['headline']
          });
      } else if (headline.length < 3 || headline.length > 32) {
        res.json({
          ok: false,
          error: 'Довжина назви таблиці від 3 до 32 символів!',
          fields: ['headline']
        });
      } else if (owner != userId) {
        res.json({
          ok: false,
          error: 'Ви не власник!',
          fields: ['owner']
        });
      } else {
        models.Client.create({        //Створення поста
            headline,
            post,
            owner
        }).then(client => {
            console.log(client);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(err);
            console.log(client);
            res.json({
            ok: false
          }); 
        });
      }  
    }
});


module.exports = router;
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
      const post = req.body.post;

    if(!headline) {
        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields: ['login', 'password', 'passwordConfirm']
          });
      } else if (headline.length < 3 || headline.length > 32) {
        res.json({
          ok: false,
          error: 'Длина заголовка от 3 до 32 символов!',
          fields: ['headline']
        });
      } else {
        models.Client.create({        //Створення поста
            headline,
            post
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
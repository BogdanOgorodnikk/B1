const express = require('express');
const router = express.Router();

const models = require('../models');

// Перевірка чи підключений
router.get('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
          res.render('generalTable/add', {
        user: {
          id: userId,
          login: userLogin
        }
      });  
    }
});

// Створення нової загальної таблиці
router.post('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!userId || !userLogin) {
        res.redirect('/')
    } else {
      const title = req.body.title.trim().replace(/ +(?= )/g, '');

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

        models.Post.create({        //Створення загальної таблиці
            title,
            owner: userId
        }).then(post => {
            console.log(post);
            res.json({
            ok: true
          });            
        }).catch(err =>{
            console.log(err);
            console.log(post);
            res.json({
            ok: false
          }); 
        });
      }  
    }
});

module.exports = router;

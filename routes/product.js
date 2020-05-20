const express = require('express');
const router = express.Router();
const moment = require('moment');
moment.locale('ru');

const models = require('../models');
  
//POST GET
  router.get('/:product', (req, res, next) => {
    const url = req.params.product.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;


    if (!url) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      models.Client.findOne({
        url
      }).then(client => {
        if (!client) {
          const err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else {
          models.Product.find({
            client: client.id
          }).then(products => {
          models.Product.aggregate([ 
            {  
              $group :{ _id: "$client",
              salary: { 
                $sum : "$debts"
               }
            }
            }
            ])
            .then(prosum => {
            res.render('products/product', {
            client,
            products,
            moment,
            prosum,
            user: {
              id: userId,
              login: userLogin
            }
          });
            })

          });

        }
      });
    }
  });
  
  



module.exports = router;
const express = require('express');
const router = express.Router();

const models = require('../models');


// GET for my_table
router.get('/my_tables/:login', (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const login = req.params.login;

  

  models.User.findOne({
    login
  }).then(user => {
    models.Post.find({
      owner: user.id
    })
      .then(posts => {
        models.Post.count({
          owner: user.id
        })
          .then(count => {
            res.render('tables/my_table', {
              posts,
              _user: user,
              user: {
                id: userId,
                login: userLogin
              }
            });
          })
          .catch(() => {
            throw new Error('Server Error');
          });
      })
      .catch(() => {
        throw new Error('Server Error');
      });
  });
});


// GET for url
router.get('/:table', (req, res, next) => {
  const url = req.params.table.trim().replace(/ +(?= )/g, '');
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;


  if (!url) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    models.Post.findOne({
      url
    }).then(post => {
      if (!post) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        models.Client.find({
          post: post.id
        }).then(clients => {
          models.Product.aggregate([ 
            {  
              $group :{ _id: "$client",
              salary: { 
                $sum : "$debts"
               }
            }
            }
            ]).then(proos => {
          res.render('tables/table', {
          post,
          clients,
          proos,
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

// делете for url
router.get('/:table/:owner/:id', (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');
  const owner = req.params.owner.trim().replace(/ +(?= )/g, '');
 
  if(!userId || !userLogin) {
    res.redirect('/')
} else if(owner != userId) {
  res.redirect('/')
} else {
    if (!id || !owner) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
      } else {
        models.Client.findByIdAndRemove(id)
      .then(cli => {
        res.render('tables/table', {
        cli,
        user: {
          id: userId,
          login: userLogin
        }
      });
      res.redirect('back');
      })
      }      
}

 
});

module.exports = router;
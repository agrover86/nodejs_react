const passport = require('passport');

module.exports = (app) => {
  // express route handlers
  // user tries to authenticate send them to google server
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  // once user accepts google permission send to back to local host
  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout' , (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

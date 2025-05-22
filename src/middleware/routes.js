const prefixApi = process.env.PREFIX_API || '/api/v1';
const LeadershipKit = require('../routes/LeadershipKitRoutes');

module.exports = function(app) {
  app.use(prefixApi, LeadershipKit);
}
module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
    app.get('/groups', index.findAllGroups);
    app.get('/groups/:id', index.findGroupById);
    app.get('/subgroups', index.findAllSubGroups);
    app.get('/add/group/:groupName', index.addGroup);
    app.get('/add/group/:groupId/subgroup/:subgroupName', index.addSubGroup);
    //app.put('/groups/:id', index.updateGroup);
    //app.delete('/wines/:id', index.deleteGroup);
};
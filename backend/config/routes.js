/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const QuestionsController = require("../api/controllers/QuestionsController");


module.exports.routes = {

    'POST /admin/:action' : 'AdminController.signupLogin',

    'POST /topic/add' : 'TopicController.addTopic',
    'PATCH /topic/edit/:id' : 'TopicController.editTopic',
    'DELETE /topic/delete/:id': 'TopicController.deleteTopic',
    'GET /topic/findOne/:id':'TopicController.findOne',
    'GET /topic/find' : 'TopicController.find',
    'GET /topic/count' : 'TopicController.countTopics',


    'POST /question/add/:id' : 'QuestionsController.addQuestion',
    'GET /questions/:id' : 'QuestionsController.listQueByTopic',
    'GET /questions/all' : 'QuestionsController.listQue',
};

const express = require('express');
const ClientController = require("../Controllers/ClientController")
//
const Router = express.Router();
Router.route('/')
    .get(ClientController.GetAllClients)
    .post(ClientController.CreateClient);
Router.route('/:id')
    .put(ClientController.UpdateClient)
    .get(ClientController.GetOneClient)
    .delete(ClientController.DeleteClient)
module.exports = Router;
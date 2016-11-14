﻿(function() {

    angular.module('app').factory('entityManagerFactory', ['breeze', 'logger', emFactory]);

    function emFactory(breeze, logger) {

        // Same origin Web Api controller
        var defaultServiceName = 'breeze/todos'; 

        // Cross origin service example (a source of Todos from BreezeJs
        //var defaultServiceName = 'http://sampleservice.breezejs.com/api/todos/'; 

        var factory = {
            hasServerMetadata: true, // TRY it with false to see client-side metadata
            serviceName:       defaultServiceName,
            getEntityManager:  getEntityManager
        };
        return factory;

        //////////////////

        function getEntityManager() {
            var dataservice = new breeze.DataService({
                hasServerMetadata: factory.hasServerMetadata,
                serviceName:       factory.serviceName,
            });

            var manager = new breeze.EntityManager({ dataService: dataservice });

            if (factory.hasServerMetadata) {
                logger.info("Query metadata from the server.");
            } else {
                useClientMetadata(manager);
                logger.info("Create metadata on the client.");
            }

            manager.enableSaveQueuing(true);
            return manager;
        }

        /* Todo: relocate to a 'model' module ? */
        function useClientMetadata(manager) {

            var DT = breeze.DataType;
            var helper = new breeze.config.MetadataHelper(); 
            var metadataStore = manager.metadataStore;

            var todoType = {
                name: "TodoItem",
                namespace: 'Todo.Models', //server-side model namespace
                autoGeneratedKeyType: breeze.AutoGeneratedKeyType.Identity, // store-gen'd PKs
                defaultResourceName: "Todos", // query endpoint most commonly used to get this type

                dataProperties: {
                    Id:          {type: DT.Int32},
                    Description: {max: 30,           required: true},
                    CreatedAt:   {type: DT.DateTime, required: true},
                    IsDone:      {type: DT.Boolean,  required: true},
                    IsArchived:  {type: DT.Boolean,  required: true},
                }
            };
            helper.addTypeToStore(metadataStore, todoType);
        }
    }

})();
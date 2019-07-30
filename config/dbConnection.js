/* importar o modulo mongoDB */
var mongo = require('mongodb');

var connMongoDBWrapper = function () {
    console.log("Entrou na função de conexão");
    
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost', //string contendo o endereço do servidor
            27017, //porta de conexão
            {}
        ),
        {}
    );
    return db;
}

module.exports = function(){
    return connMongoDBWrapper;
};
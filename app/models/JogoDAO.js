class JogoDAO {

    constructor (connection) {
        this._connection = connection();
    }

    gerarParametros (usuario) {
        
        this._connection.open(function(err, mongoCliente){
                mongoCliente.collection("jogo", function(err, collection){
                collection.insert({
                    usuario: usuario,
                    moeda: 15,
                    suditos: 10,
                    temor: Math.floor(Math.random()*1000),
                    sabedoria: Math.floor(Math.random()*1000),
                    comercio: Math.floor(Math.random()*1000),
                    magia: Math.floor(Math.random()*1000)
                }); 
                mongoCliente.close();

            });
        });        
    }
    iniciaJogo(res, usuario, casa,comando_invalido ){

        this._connection.open(function(err, mongoCliente){
            mongoCliente.collection("jogo", function(err, collection){
                collection.find({usuario: usuario}).toArray(function(err, result){
               
                    console.log(result[0]);
                    
                    res.render("jogoView", {img_casa: casa, jogo: result[0], comando_invalido: comando_invalido});
                    
                    mongoCliente.close();
                });
               
            });
        });
    }
}
    
module.exports = function () {
    return JogoDAO;
};

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

    iniciaJogo(res, usuario, casa, msg ){

        this._connection.open(function(err, mongoCliente){
            mongoCliente.collection("jogo", function(err, collection){
                collection.find({usuario: usuario}).toArray(function(err, result){
               
                    console.log(result[0]);
                    
                    res.render("jogoView", {img_casa: casa, jogo: result[0], msg: msg});
                    
                    mongoCliente.close();
                });
               
            });
        });
    }

    acao(acao){

        console.log('log: ', acao);
        this._connection.open(function(err, mongoCliente){
            mongoCliente.collection("acao", function(err, collection){
            
                var date = new Date();
                var tempo = null;

                switch (parseInt(acao.acao)) {
                    case 1:
                        tempo = 1 * 60 * 60000;
                    break;
                    case 2:
                        tempo = 2 * 60 * 60000
                    break;
                    case 3:
                        tempo = 5 * 60 * 60000
                    break;
                    case 4:
                        tempo = 5 * 60 * 60000
                    break;
                }
                    
                acao.acao_termina_em = date.getTime() + tempo;


                collection.insert(acao); 
                mongoCliente.close();

            });
        });        
    }

    getAcoes(usuario, res){

        this._connection.open(function(err, mongoCliente){
            mongoCliente.collection("acao", function(err, collection){
                var momento_atual = new Date().getTime(); //para filtrar registros vencidos
                collection.find({usuario: usuario, acao_termina_em: {$gt: momento_atual}}).toArray(function(err, result){
               
                    console.log(result);
                    
                    res.render('pergaminhosView', {acoes: result} ); 

                    mongoCliente.close();
                });
               
            });
        });
    }

}
    
module.exports = function () {
    return JogoDAO;
};

function UsuariosDAO(connection) {
    console.log('Objeto carregado!');
    this._connection = connection();
   
};

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    console.log(usuario);
    console.log(this._connection);
    
    this._connection.open(function(err, mongoCliente){
            mongoCliente.collection("usuarios", function(err, collection){
            collection.insert(usuario); 
            mongoCliente.close();

        });
    });
        
};

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
    console.log(usuario);

    this._connection.open(function(err, mongoCliente){
        mongoCliente.collection("usuarios", function(err, collection){
        collection.find(usuario).toArray(function(err, result){ //o result é o nosso array
            console.log(result);
            console.log(result.length);
            if(result.length > 0){
                req.session.autorizado = true;
                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
            }else{
                req.session.autorizado = false;
                req.session.usuario = null;
                req.session.casa = null;
            }

            if(req.session.autorizado){
                //res.send('Usuario encontrado na base de dados.')
                res.redirect("jogo");
            }else{
                res.render("indexView", {validacao: [{msg: "usuUsuário não permitido."}]});
            }
            
        }); //returna um cursor e utilizadmo o toArray para recuperar o cursor colocando  num array no callback
        //collection.find({usuario: {$eq: usuario.usuario, senha: {$eq: usuario.senha}}}); //returna um cursor
        //posso usar sem o $eq, nas operações de igualdade não é necessario. e utilizamos o proprio json
        mongoCliente.close();

    });
});
    

};


module.exports = function () {
    return UsuariosDAO;
};


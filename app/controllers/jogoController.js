module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado !== true) {//se nao for identica
        res.send('Usuário precisa fazer o login.')
        return;
        
    }
    var comando_invalido = 'N'; 
    if(req.query.commando_invalido == 'S'){
        comando_invalido = 'S';
    }
    console.log(comando_invalido);

    var usuario = req.session.usuario;
    var casa = req.session.casa;
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, usuario, casa,comando_invalido);
};

module.exports.sair = function (application, req, res) {

    req.session.destroy(function(err){
        res.render('indexView',{validacao: {}} ); 
    });
};

module.exports.suditos = function (application, req, res) {

    if (req.session.autorizado !== true) {//se nao for identica
        res.send('Usuário precisa fazer o login.')
        return;
        
    }

    res.render('aldeoesView',{validacao: {}} ); 
};

module.exports.pergaminhos = function (application, req, res) {

    if (req.session.autorizado !== true) {//se nao for identica
        res.send('Usuário precisa fazer o login.')
        return;
        
    }

    res.render('pergaminhosView',{validacao: {}} ); 
};

module.exports.ordenar_acao_sudito = function (application, req, res) {

    var dadosForm = req.body;
    req.assert('acao', "Ação deve ser informada").notEmpty();
    req.assert('quantidade', "Quantidade dever ser informada").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?commando_invalido=S');
        return;
    }
    console.log('Entrou dados form', dadosForm);
    
    res.send("tudo ok!");
    //res.render('pergaminhosView',{validacao: {}} ); 
};
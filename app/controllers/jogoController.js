module.exports.jogo = function (application, req, res) {

    if (req.session.autorizado !== true) {//se nao for identica
        res.send('Usuário precisa fazer o login.')
        return;
        
    }
    // var msg = ''; 
    // if(req.query.msg != ''){
    //     msg = 'S';
    // }
    var msg = req.query.msg
    console.log(msg);
    var usuario = req.session.usuario;
    var casa = req.session.casa;
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(res, usuario, casa, msg);
};

module.exports.sair = function (application, req, res) {

    req.session.destroy(function(err){
        res.render('indexView', {validacao: {}} ); 
    });
};

module.exports.suditos = function (application, req, res) {

    if (req.session.autorizado !== true) {//se nao for identica
        res.send('Usuário precisa fazer o login.')
        return;
        
    }

    res.render('aldeoesView', {validacao: {}} ); 
};

module.exports.pergaminhos = function (application, req, res) {

    if (req.session.autorizado !== true) {//se nao for identica
        res.send('Usuário precisa fazer o login.')
        return;
        
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    var usuario = req.session.usuario;
    jogoDAO.getAcoes(usuario, res);
};

module.exports.ordenar_acao_sudito = function (application, req, res) {

    var dadosForm = req.body;
    req.assert('acao', "Ação deve ser informada").notEmpty();
    req.assert('quantidade', "Quantidade dever ser informada").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }
    
    
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    console.log('dadosForm1', dadosForm);
    
    dadosForm.usuario = req.session.usuario;

    jogoDAO.acao(dadosForm);
    res.redirect('jogo?msg=B');
    //res.render('pergaminhosView',{validacao: {}} ); 
};
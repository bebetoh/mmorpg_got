module.exports.cadastro = function (application, req, res) {
    res.render('cadastroView',{validacao: {}, dadosForm: {}} );
};

module.exports.cadastrar = function (application, req, res) {
    //res.send('vamos cadastrar');
    var dadosForm = req.body;

    console.log(req.body);
    
    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();
    
    var erros = req.validationErrors();
    if(erros){
        ///console.log(erros);
        
        res.render('cadastroView', {validacao: erros , dadosForm: dadosForm});
    }

    var connection = application.config.dbConnection;

    var usuariosDAO = new application.app.models.UsuariosDAO(connection);
    
    var jogoDAO = new application.app.models.JogoDAO(connection);

    usuariosDAO.inserirUsuario(dadosForm);

    jogoDAO.gerarParametros(dadosForm.usuario);
    res.send("podemos cadastrar");
};
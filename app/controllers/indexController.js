module.exports.index = function (application, req, res) {

    res.render('indexView', {validacao:{}});
    
};

module.exports.autenticar = function (application, req, res) {

    var dadosForm = req.body;
    //console.log(dadosForm);
    
    req.assert('usuario', 'Usuário não pode ser vazio.').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia.').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){
        console.log(erros);
        res.render("indexView", {validacao: erros});
        return;
    }

    var connection = application.config.dbConnection;
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);
    usuariosDAO.autenticar(dadosForm, req, res);

    //res.send('TUdo ok para criar a sessao');
};
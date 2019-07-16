module.exports = function(application){
	application.get('/cadastro', function(req, res){
		//res.send('Bem vindo a sua app NodeJS!');
		res.render('cadastroView');
	});
}
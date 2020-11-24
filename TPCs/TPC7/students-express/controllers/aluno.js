var Aluno = require('../models/aluno')

//Devolve a lista de alunos
module.exports.listar = () => {
    return Aluno
        .find({})
        .sort({Número:1})
        .exec()
}

module.exports.consultar = id => {
    return Aluno
        .findOne({
            _id: id
        })
        .exec()
}

module.exports.inserir = a => {
    var novo = new Aluno(a.body)
    return novo.save()
}
var Usuario = require('../modelo/usuario');
var Perfil = require('../modelo/perfil');

//Crear el usuario en base de datos
exports.crearUsuario = function(req, resp){
  var id_usuario = req.body.id_usuario;
  var nombre = req.body.nombre;
  var username = req.body.username;
  var correo = req.body.correo;
  var password = req.body.password;
  var perfil = req.body.perfil;
  var trader = req.body.trader;
  var alimento = req.body.alimento;
  var animal = req.body.animal;
  var agua = req.body.agua;

  Usuario.find({username: username},function(err, lista){
    if (lista[0] === undefined) {
      var nuevoUsuario = {'id_usuario': id_usuario, 'nombre': nombre, 'username': username, 'correo': correo, 'password': password, 'trader': trader, 'alimento': alimento, 'animal': animal, 'agua': agua , 'perfil': perfil};
      Usuario.create(nuevoUsuario, function(err, respuesta){
        if (respuesta !== null) {
          Usuario.find(function(err, usuarios){
            if (usuarios !== null) {
              resp.send(usuarios);
            }
          })
        }
      })
    }
    else{
      resp.send('1');
    }
  });
}

//envia todos los usuarios a la vista
exports.TraerUsuarios = function(req, resp){
  Usuario.find(function(err, usuarios){
    if (usuarios !== null) {
      resp.send(usuarios);
    }
  });
}


exports.TraerUsuarioUsername = function(req, resp){
  var username = req.params.username;
  Usuario.find({username: username},function(err, lista){
    if (lista !== null) {
      resp.send(lista);
    }
  })
}


exports.TraerUsuarioId = function(req, resp){
  var id_usuario = req.params.id_usuario;
  Usuario.find({id_usuario: id_usuario},function(err, lista){
    if (lista !== null) {
      resp.send(lista);
    }
  })
}


exports.TraerUsuariosFiltro = function(req, resp){
  var id_perfil = req.params.id_perfil;
  Usuario.find({'perfil.id_perfil': id_perfil},function(err, usuarios){
    if (usuarios === null) {
      resp.send(null);
    }else{
      resp.send(usuarios);
    }
  });
}


exports.TraerTraders = function(req, resp){
  Usuario.find({'trader': true},function(err, usuarios){
    if (usuarios === null) {
      resp.send(null);
    }else{
      resp.send(usuarios);
    }
  });
}


//elimina un usuario en la base de datos
exports.eliminarUsuario = function(req, resp){
  Usuario.remove({id_usuario: req.params.id_usuario}, function(err, respuesta){
    if (respuesta !== null) {
      Usuario.find(function(err, usuarios){
        if (usuarios !== null) {
          resp.send(usuarios);
        }
      })
    }
  });

}

//Metodo que actualiza un usuario en la base de datos.
exports.actualizarUsuario = function(req, resp){

  var id_usuario = req.params.id;
  var nombre = req.body.nombre;
  var username = req.body.username;
  var correo = req.body.correo;
  var password = req.body.password;
  var perfil = req.body.perfil;
  var trader = req.body.trader;

      Usuario.update({id_usuario: id_usuario},
        {$set: {nombre: nombre, username: username, correo: correo, password: password, trader: trader, perfil: perfil}}, function(err, respuesta){
          if (respuesta !== null) {
            Usuario.find(function(err, usuarios){
              if (usuarios !== null) {
                resp.send(usuarios);
              }
            });
          }
        });
  }

app.controller('LoginCtrl', function($scope, $http, $rootScope, $location, $notify){

  //Metodo que valida el ingreso del usuario a la pagina
  $scope.validarCampos = function(user, pass){
    var credenciales = {username: user, password: pass};
    $http.post('/api/validarUsuario', credenciales).success(function(usuario){
      if (usuario === '') {
        $notify.setTime(4).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
        $notify.setPosition('bottom-left');
        $notify.error('Notificacion', 'Usuario no Existe');
      }else{
        $rootScope.loggedUser = usuario;

        for (var i = 0; i < usuario.perfil[0].llave.length; i++) {

          if (usuario.perfil[0].llave[i].nombre_llave === 'Llave Dashboard') {
            $rootScope.dash = true;
          }
          if (usuario.perfil[0].llave[i].nombre_llave === 'Crear Solicitud') {
            $rootScope.creaSol = true;
          }
          if (usuario.perfil[0].llave[i].nombre_llave === 'Busqueda Solicitud') {
            $rootScope.busSol = true;
          }
          if (usuario.perfil[0].llave[i].nombre_llave === 'Busqueda Administrador') {
            $rootScope.solOT = true;
            $rootScope.sellos = true;
          }
          if (usuario.perfil[0].llave[i].nombre_llave === 'Administracion') {
            $rootScope.admin = true;
          }
          if (usuario.perfil[0].llave[i].nombre_llave === 'Administracion Parametros') {
            $rootScope.admPar = true;
          }
          if (usuario.perfil[0].llave[i].nombre_llave === 'Ordenes de trabajo inspector') {
            $rootScope.otinspec = true;
          }
          if (usuario.perfil[0].llave[i].nombre_llave === 'Laboratorio') {
            $rootScope.lab = true;
          }
          $rootScope.cerrar = true;

        }

        if ($rootScope.loggedUser.perfil[0].nombre_perfil === 'Solicitante') {
          $location.path('dashboard');
        }
        if ($rootScope.loggedUser.perfil[0].nombre_perfil === 'Administrador') {
          $location.path('busquedaSolicitudAdministrador');
        }
        if ($rootScope.loggedUser.perfil[0].nombre_perfil === 'Inspector') {
          $location.path('inspector');
        }
        if ($rootScope.loggedUser.perfil[0].nombre_perfil === 'Laboratorio') {
          $location.path('laboratorio');
        }

        $notify.setTime(4).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
        $notify.setPosition('bottom-left');
        $notify.success('Notificacion', 'Bienvenido ' + usuario.nombre);
      }
    });
  }

  $scope.cerrarSesion = function(){

    var usuario = null;

    $rootScope.dash = null;
    $rootScope.creaSol = null;
    $rootScope.busSol = null;
    $rootScope.solOT = null;
    $rootScope.sellos = null;
    $rootScope.admin = null;
    $rootScope.admPar = null;
    $rootScope.cerrar = null;
    $rootScope.otinspec = null;
    $rootScope.lab = null;
    $rootScope.loggedUser = usuario;
    $rootScope.chatUsers = [];
  };

})

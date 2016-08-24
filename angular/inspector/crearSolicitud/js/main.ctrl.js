app.controller('crearSolicitudInspectorController',function ($scope, $http ,$rootScope , $notify, $timeout) {

  $scope.cambioCliente = function(usuario){
    $http.get('/api/listarTipoMuestreo').success(function(response){
      var lista = [];
      var listaM = [];
      if (usuario.animal) {
        lista.push(1);
      }
      if (usuario.alimento) {
        lista.push(2);
      }
      if (usuario.agua) {
        lista.push(3);
      }


      for (var i = 0; i < lista.length; i++) {
        for (var j = 0; j < response.length; j++) {
          if (lista[i] === response[j].seleccion) {
            listaM.push(response[j]);
          }
        }
      }

      $scope.listaMuestreo = listaM;
    });
  }

  //Funcion que trae los clientes de la base de datos.
  //-----------------------------------------------------------------------------------//
  listarUsuarios();
  function listarUsuarios(){
    var id_perfil = 2;
    $http.get('/api/usuarios/' + id_perfil ).success(function(response){
      $scope.listarUsuarios = response;
    });
  };
  //-----------------------------------------------------------------------------------//


  //Metodos para datepicker
  //-----------------------------------------------------------------------------------------------------------------//
  $scope.today = function() {
    $scope.fecha_muestreo = new Date();
    $scope.fecha_creacion = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.fecha_muestreo = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
    mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.fecha_muestreo = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
    mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

  //-----------------------------------------------------------------------------------------------------------------//

  $scope.habilitaHarina = false;
  $scope.habilitaMuestreo = false;
  $scope.habilitaAlimento = false;
  $scope.habilitaEnvio = false;

  $scope.habilitarBotonMuestreo = function(valor){

    var id_tipoMuerstreo = valor.id_tipoMuestreo;

    if (id_tipoMuerstreo === 1) {
      $scope.habilitaHarina = true;
      $scope.habilitaMuestreo = false;
      $scope.habilitaAlimento = false;
      $scope.habilitaEnvio = true;
    }else if (id_tipoMuerstreo === 2) {
      $scope.habilitaHarina = false;
      $scope.habilitaMuestreo = false;
      $scope.habilitaAlimento = true;
      $scope.habilitaEnvio = true;
    }else{
      $scope.habilitaHarina = false;
      $scope.habilitaMuestreo = true;
      $scope.habilitaAlimento = false;
      $scope.habilitaEnvio = true;
    }

  }

})

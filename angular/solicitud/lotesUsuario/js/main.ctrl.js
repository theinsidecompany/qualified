app.controller('loteUsuarioController', function ($scope, $notify, $http, $rootScope, $timeout){

  listarLotes();
  $scope.seleccionEtapas = undefined;
  $scope.seleccionAceptadas = true;
  $scope.seleccionRechazadas = false;



  function listarLotes(){
    var id_usuario = $rootScope.loggedUser.id_usuario;
    $http.get('/api/traerLotesUsuarios/' + id_usuario).success(function(response){
      $scope.listaLotesUsuario = response[0].lotes;

      var lista = [];
      for (var i = 0; i < response[0].lotes.length; i++) {
        lista.push(response[0].lotes[i].nroInforme);
      }
      var i,
      len=lista.length,
      out=[],
      obj={},
      num = [];
      for (i=0;i<len;i++) {
        obj[lista[i]]=0;
      }
      for (i in obj) {
        out.push(i);
      }

      $scope.listaInformes = out;
    })
  }

  $scope.apruebaInocuidad = function(lista, index){

    for (var i = 0; i < lista.length; i++) {
      if (i === index) {
        lista[i].inocuidad = true;
      }
    }
    var nuevo = {id_usuario: $rootScope.loggedUser.id_usuario, lotes: lista};
    $http.post('/api/modificaLotesUsuario', nuevo).success(function(response){
      $scope.listaLotesUsuario = response[0].lotes;
    })
  }

  $scope.desapruebaInocuidad = function(lista, index){

    for (var i = 0; i < lista.length; i++) {
      if (i === index) {
        lista[i].inocuidad = false;
      }
    }
    var nuevo = {id_usuario: $rootScope.loggedUser.id_usuario, lotes: lista};
    $http.post('/api/modificaLotesUsuario', nuevo).success(function(response){
      $scope.listaLotesUsuario = response[0].lotes;
    })
  }


  $scope.apruebaCalidad = function(lista, index){

    for (var i = 0; i < lista.length; i++) {
      if (i === index) {
        lista[i].calidad = true;
      }
    }
    var nuevo = {id_usuario: $rootScope.loggedUser.id_usuario, lotes: lista};
    $http.post('/api/modificaLotesUsuario', nuevo).success(function(response){
      $scope.listaLotesUsuario = response[0].lotes;
    })
  }

  $scope.desapruebaCalidad = function(lista, index){

    for (var i = 0; i < lista.length; i++) {
      if (i === index) {
        lista[i].calidad = false;
      }
    }
    var nuevo = {id_usuario: $rootScope.loggedUser.id_usuario, lotes: lista};
    $http.post('/api/modificaLotesUsuario', nuevo).success(function(response){
      $scope.listaLotesUsuario = response[0].lotes;
    })
  }


  $scope.apruebaDespacho = function(lista, index){

    for (var i = 0; i < lista.length; i++) {
      if (i === index) {
        lista[i].despacho = true;
      }
    }
    var nuevo = {id_usuario: $rootScope.loggedUser.id_usuario, lotes: lista};
    $http.post('/api/modificaLotesUsuario', nuevo).success(function(response){
      $scope.listaLotesUsuario = response[0].lotes;
    })
  }

  $scope.desapruebaDespacho = function(lista, index){

    for (var i = 0; i < lista.length; i++) {
      if (i === index) {
        lista[i].despacho = false;
      }
    }
    var nuevo = {id_usuario: $rootScope.loggedUser.id_usuario, lotes: lista};
    $http.post('/api/modificaLotesUsuario', nuevo).success(function(response){
      $scope.listaLotesUsuario = response[0].lotes;
    })
  }

  listarBodegas();
  function listarBodegas(){
    var id_usuario = $rootScope.loggedUser.id_usuario;
    $http.get('/api/traerLotesUsuarios/' + id_usuario).success(function(response){

      var lista = response[0].lotes;
      var listaBodegas = [];
      for (var i = 0; i < lista.length; i++) {
        listaBodegas.push(lista[i].bodega.nombreBodega);
      }

      var i,
      len=listaBodegas.length,
      out=[],
      obj={},
      num = [];
      for (i=0;i<len;i++) {
        obj[listaBodegas[i]]=0;
      }
      for (i in obj) {
        out.push(i);
      }

      $scope.listaBodegas = out;

    })
  }



  $scope.listarTodos = function(filtroEtapa){
    if (filtroEtapa == '1') {
      var id_usuario = $rootScope.loggedUser.id_usuario;
      $http.get('/api/traerLotesUsuarios/' + id_usuario).success(function(response){
        $scope.listaLotesUsuario = response[0].lotes;
        $scope.cambioSeleccion = undefined;
        $scope.muestras = false;
      })
    }else if (filtroEtapa == '2') {
      $scope.cambioSeleccion = true;
      $scope.muestras = true;
    }else {
      $scope.cambioSeleccion = false;
      $scope.muestras = true;
    }
  }


  $scope.EnviarDespacho = function(lista, fecha_asignacion){
    var fecha_actual = new Date();
    if (fecha_asignacion <= fecha_actual) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'Fecha asignacion no valida');
    }else {
      var listaDespacho = [];
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].check === false || lista[i].check === undefined) {

        }else {
          listaDespacho.push(lista[i]);
          lista[i].validaCheck = true;
        }
      }

      var generar = {id_cliente: $rootScope.loggedUser.id_usuario};
      $http.post('/api/contadorDespacho', generar).success(function(response){
        var fecha = new Date();
        var nuevo = [{"id_proceso" : 1, "descripcion" : "Solicitud iniciada", "color" : "01DF01", "icono" : "check", "visible" : true}];
        var solicitud = {id_solicitud_despacho: response.id_solicitud_despacho, id_solicitud_despacho_cliente: response.id_solicitud_despacho_cliente, cliente: $rootScope.loggedUser.nombre, id_cliente: $rootScope.loggedUser.id_usuario ,  proceso: nuevo, fecha_creacion: fecha, fecha_asignacion: fecha_asignacion, lotes: listaDespacho};
        $http.post('/api/solicitudDespacho', solicitud).success(function(respuesta){
        })
      })

      for (var i = 0; i < lista.length; i++) {
        if (lista[i].check === true) {
          lista[i].check = false;
          lista[i].validaCheck = true;
        }
      }

      var proto = {id_usuario: $rootScope.loggedUser.id_usuario, lotes: lista};
      $http.post('/api/modificaLotesUsuario', proto).success(function(respuesta){
      })
    }
  }

  //Metodos DatePicker
  //------------------------------------------------------------------------------------------------------------------------------//
  $scope.today = function() {
    $scope.fecha_muestreo = new Date();
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
    var hoy = new Date();
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
  //------------------------------------------------------------------------------------------------------------------------------//

  $scope.enviarObservacionModal = function (sol, id_lote) {

    id = {id_solicitud: sol, id_lote: id_lote};

    $http.post('/api/traerObservacion', id).success(function(respuesta){
      $scope.ObservacionesModal = respuesta.observacion;
    });

  };


})

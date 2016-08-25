app.controller('muestreoController', function ($scope, $notify, $http, $rootScope, $location, $timeout, Upload){

  listarSolTrader();
  listarBodegas();
  listarPaises();
  validaTrader();
  cargarLista();
  listarMateriaPrima();
  listarTraders();

  $scope.retiro = "muestreo";
  $scope.retiroAnimal = "muestreo";


  $scope.compositoSeleccion =  function(){
    $scope.colorSuperior = "warning";
    $scope.colorMedio = "warning";
    $scope.colorInferior = "warning";
    $scope.valorSuperior = false;
    $scope.valorMedio = false;
    $scope.valorInferior = false;
  }


  $scope.colorSuperior = "warning";
  $scope.colorMedio = "warning";
  $scope.colorInferior = "warning";
  $scope.valorSuperior = false;
  $scope.valorMedio = false;
  $scope.valorInferior = false;

  $scope.seleccionarSuperior = function(){

      if ($scope.colorSuperior === "success") {
        $scope.colorSuperior = "warning";
        $scope.valorSuperior = false;
      }else {
        $scope.colorSuperior = "success";
        $scope.valorSuperior = true;
      }
  }

  $scope.seleccionarMedio = function(){
      if ($scope.colorMedio === "success") {
        $scope.colorMedio = "warning";
        $scope.valorMedio = false;
      }else {
        $scope.colorMedio = "success"
        $scope.valorMedio = true;
      }
  }

  $scope.seleccionarInferior = function(){
      if ($scope.colorInferior === "success") {
        $scope.colorInferior = "warning";
        $scope.valorInferior = false;
      }else {
        $scope.colorInferior = "success"
        $scope.valorInferior = true;
      }
  }

  function listarSolTrader(){
    $http.get('/api/traders').success(function(response){
      $scope.listaTodoTraders = response;
    });
  }

  function listarBodegas(){
    $http.get('/api/traerBodega').success(function(response){
      $scope.listarBodegas = response;
    });
  };

  function listarPaises(){
    $http.get('/api/pais').success(function(response){
      $scope.listarPaises = response;
    });
  };

  function validaTrader(){
    if ($rootScope.loggedUser.trader === true) {
      $scope.habilitaTrader = false;
    }else {
      $scope.habilitaTrader = true;
    }
  }

  function cargarLista(){
    var id_tipoMuestreo = $rootScope.idTipo;
    $http.get('/api/listarTipoAnalisis/' + id_tipoMuestreo).success(function(response){
      $scope.listaTipoAnalisis = response;
    });
  };

  function listarTraders(){
    $http.get('/api/trader').success(function(response){
      $scope.listaTraders = response;
    });
  }

  function listarMateriaPrima(){
    var id_materia = 2;
    $http.get('/api/materiaPrima/' + id_materia).success(function(response){
      $scope.listarMateriaPrima = response;
    });
  }

  $scope.seleccionarTodo = function(lista){
    for (var i = 0; i < lista.length; i++) {
      lista[i].selAnalisis = true;
    }
  }

  $scope.desSeleccionar = function(lista){
    for (var i = 0; i < lista.length; i++) {
      lista[i].selAnalisis = false;
    }
  }

  $scope.mostrarAceite = false;
  $scope.mostrarGranos = false;
  $scope.mostrarAnalisis = false;
  $scope.mostrarMuestreo = false;
  $scope.mostrarTipo = false;
  $scope.habilitarCampos = function(){

    if ($rootScope.idTipo === 7 || $rootScope.idTipo === 8) {
      $scope.mostrarAnalisis = false;
    }else {
      $scope.mostrarAnalisis = true;
      $scope.mostrarMuestreo = true;
      $scope.mostrarTipo = true;
    }

    if ($rootScope.idTipo === 7) {
      $scope.mostrarAceite = true;
      $scope.mostrarGranos = false;
    }else if ($rootScope.idTipo === 8) {
      $scope.mostrarAceite = false;
      $scope.mostrarGranos = true;
    }else {
      $scope.mostrarAceite = false;
      $scope.mostrarGranos = false;
      $scope.mostrarTipo = true;
    }

    $scope.colorSuperior = "warning";
    $scope.colorMedio = "warning";
    $scope.colorInferior = "warning";
    $scope.valorSuperior = false;
    $scope.valorMedio = false;
    $scope.valorInferior = false;

  }



  $scope.agregarMuestreo = function(codigo, retiro, traders, pais, bodega, encargadoBodega, procedencia, toneladas, listaTipoAnalisis, tipoMuestra){

    var cont = 0;

    for (var i = 0; i < listaTipoAnalisis.length; i++) {

      if (listaTipoAnalisis[i].selAnalisis === true) {
        cont++;
      }

    }

    if (cont <= 0) {

      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'Sin Seleeccion de Analisis');

    }else{

      var id_item;
      if ($scope.listaItems === undefined || $scope.listaItems[0] === undefined) {
        var listaItems = [];
        id_item = 1;
      }else{
       var listaItems = $scope.listaItems;
       var index = listaItems.length -1;
       id_item = listaItems[index].id_item + 1;
      }

      var nuevo = {'id_item': id_item, 'codigo': codigo, 'retiro': retiro, 'tipo': tipoMuestra, 'traders': traders, 'origen': pais, 'bodega': bodega, 'encargadoBodega': encargadoBodega, 'procedencia': procedencia, 'toneladas': toneladas, 'listaAnalisis': listaTipoAnalisis};
      listaItems.push(nuevo);
      $scope.listaItems = listaItems;
      for (var i = 0; i < listaTipoAnalisis.length; i++) {
        listaTipoAnalisis[i].selAnalisis = false;
      }
      $scope.listaTipoAnalisis = listaTipoAnalisis;
      $rootScope.limpiarMuestreo();
    }

    $scope.agregarGranos = function( retiro, traders, pais, bodega, encargadoBodega, procedencia, toneladas, materiaPrima, trader, temperatura, seleccionAlmacenaje){
      var id_item;
      if ($scope.listaItems === undefined || $scope.listaItems[0] === undefined) {
        var listaItems = [];
        id_item = 1;
      }else{
       var listaItems = $scope.listaItems;
       var index = listaItems.length - 1;
       id_item = listaItems[index].id_item + 1;
      }

      var nuevo = {'id_item': id_item, 'retiro': retiro, 'traders': traders, 'origen': pais, 'bodega': bodega, 'encargadoBodega': encargadoBodega, 'procedencia': procedencia, 'toneladas': toneladas, 'materiaPrima': materiaPrima, 'trader': trader, 'temperatura': temperatura, 'seleccionAlmacenaje': seleccionAlmacenaje};
      listaItems.push(nuevo);
      $scope.listaItems = listaItems;
      $rootScope.limpiarGrano();

    }

  }

  $scope.agregarAceite = function(retiro, composito, traders, pais, bodega, encargadoBodega, procedencia, toneladas, tipoAceite, fabricante){



    var id_item;
    if ($scope.listaItems === undefined || $scope.listaItems[0] === undefined) {
      var listaItems = [];
      id_item = 1;
    }else{
     var listaItems = $scope.listaItems;
     var index = listaItems.length - 1;
     id_item = listaItems[index].id_item + 1;
    }

    if (composito) {
      estrato = null;
    }else {
      if ($scope.valorSuperior === false && $scope.valorMedio === false && $scope.valorInferior === false) {
        $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
        $notify.setPosition('bottom-left');
        $notify.info('Notificacion', 'Debe seleccionar al menos un estrato');
      }else{
        $scope.valorSuperior;
        $scope.valorMedio;
        $scope.valorInferior;
        var nuevoEstrato = [{'estrato': "Superior", 'seleccion': $scope.valorSuperior}, {'estrato': "Medio", 'seleccion': $scope.valorMedio}, {'estrato': "Inferior", 'seleccion': $scope.valorInferior}];

        var nuevo = {'id_item': id_item, 'retiro': retiro, 'composito': composito, 'estrato': nuevoEstrato, 'traders': traders, 'origen': pais, 'bodega': bodega, 'encargadoBodega': encargadoBodega, 'procedencia': procedencia, 'toneladas': toneladas, 'tipoAceite': tipoAceite, 'fabricante': fabricante};
        listaItems.push(nuevo);
        $scope.listaItems = listaItems;
        $rootScope.limpiarAceite();

      }

    }

  }

  $scope.eliminar = function(index, listaItems){
    listaItems.splice(index, 1);
  }


  $scope.crearSolicitud = function(fecha_muestreo){
    var hoy = new Date();
    var lote = $scope.listaItems;
    var auto = {id_solicitud: 'solicitud', id_cliente: $rootScope.loggedUser.id_usuario};
    if (fecha_muestreo <= hoy) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'Fecha de muestreo no valida');
    }else if (lote.length === 0) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'La solicitud sin item(s)');
    }else {
      $http.post('/api/contador', auto).success(function(response){
        var nuevo = [{"id_proceso" : 1, "descripcion" : "Solicitud iniciada", "color" : "01DF01", "icono" : "check", "visible" : true}];
        var solicitud = {id_solicitud: response.id_solicitud, id_solicitud_cliente: response.id_solicitud_cliente, cliente: $rootScope.loggedUser, fecha_creacion: $scope.fecha_creacion, fecha_muestreo: fecha_muestreo, estado: 'En aprobacion', lote: lote, proceso: nuevo, tipoMuestreo: {'id_muestreo': $rootScope.idTipo, 'descripcion': $rootScope.titulo}};
        $http.post('/api/solicitud', solicitud).success(function(respuesta){
          $rootScope.$emit("identificadorSolicitud", respuesta);
        });

        $rootScope.$on("identificadorSolicitud", function(event, solicitud){
          $scope.valida = true;
          var mail = {nombre: 'Qualified', para: $rootScope.loggedUser.correo, asunto: 'Alerta Qualified', contenido: 'Solicitud ' + solicitud.id_solicitud + ' creada por ' + $rootScope.loggedUser.nombre};
          $http.post('/api/mail', mail).success(function(respuesta){});
          $http.get('/api/usuarioId/' + 1).success(function(respu){
            var mail = {nombre: 'Qualified', para: respu[0].correo, asunto: 'Alerta Qualified', contenido: 'Solicitud ' + solicitud.id_solicitud + ' creada por ' + $rootScope.loggedUser.nombre};
            $http.post('/api/mail', mail).success(function(respuesta){});
          });
        });
      });

      $timeout(function() {
        $scope.listaItems = '';
        $location.path("/busquedaSolicitudCliente");
      }, 500);
    }
  }


  //Metodos para datepicker
  //-----------------------------------------------------------------------------------------------------------------//
  $scope.fecha_creacion = new Date();
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


});


app.controller('limpiarCamposSolicitante', function($rootScope, $scope){

  $rootScope.limpiarMuestreo = function(){

    $scope.codigo = '';
    $scope.retiro = 'muestreo';
    $scope.tipoMuestra = '';
    $scope.traders = '';
    $scope.pais = '';
    $scope.bodega = '';
    $scope.encargadoBodega = '';
    $scope.procedencia = '';
    $scope.toneladas = '';

  };

  $rootScope.limpiarGrano = function(){

    $scope.codigo = '';
    $scope.retiroAnimal = 'muestreo';
    $scope.tipoMuestra = '';
    $scope.traders = '';
    $scope.pais = '';
    $scope.bodega = '';
    $scope.encargadoBodega = '';
    $scope.procedencia = '';
    $scope.toneladas = '';
    $scope.materiaPrima = '';
    $scope.trader = '';
    $scope.temperatura = '';
    $scope.seleccionAlmacenaje = '';

  };

  $rootScope.limpiarAceite = function(){

    $scope.codigo = '';
    $scope.retiroAnimal = 'muestreo';
    $scope.tipoMuestra = '';
    $scope.traders = '';
    $scope.pais = '';
    $scope.bodega = '';
    $scope.encargadoBodega = '';
    $scope.procedencia = '';
    $scope.toneladas = '';
    $scope.estrato = '';
    $scope.composito = '';
    $scope.tipoAceite = '';
    $scope.fabricante = '';

    $scope.compositoSeleccion =  function(){
      $scope.colorSuperior = "warning";
      $scope.colorMedio = "warning";
      $scope.colorInferior = "warning";
      $scope.valorSuperior = false;
      $scope.valorMedio = false;
      $scope.valorInferior = false;
    }


    $scope.colorSuperior = "warning";
    $scope.colorMedio = "warning";
    $scope.colorInferior = "warning";
    $scope.valorSuperior = false;
    $scope.valorMedio = false;
    $scope.valorInferior = false;

    $scope.seleccionarSuperior = function(){

        if ($scope.colorSuperior === "success") {
          $scope.colorSuperior = "warning";
          $scope.valorSuperior = false;
        }else {
          $scope.colorSuperior = "success";
          $scope.valorSuperior = true;
        }
    }

    $scope.seleccionarMedio = function(){
        if ($scope.colorMedio === "success") {
          $scope.colorMedio = "warning";
          $scope.valorMedio = false;
        }else {
          $scope.colorMedio = "success"
          $scope.valorMedio = true;
        }
    }

    $scope.seleccionarInferior = function(){
        if ($scope.colorInferior === "success") {
          $scope.colorInferior = "warning";
          $scope.valorInferior = false;
        }else {
          $scope.colorInferior = "success"
          $scope.valorInferior = true;
        }
    }


  };

});

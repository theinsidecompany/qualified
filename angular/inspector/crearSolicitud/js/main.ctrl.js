app.controller('crearSolicitudInspectorController',function ($scope, $http ,$rootScope , $notify, $timeout) {

  $scope.habilitaHarina = false;
  $scope.habilitaMuestreo = false;
  $scope.habilitaAlimento = false;
  $scope.habilitaEnvio = false;

  $scope.habilitarBotonMuestreo = function(valor){

    if (valor === null) {
      $scope.habilitaHarina = false;
      $scope.habilitaMuestreo = false;
      $scope.habilitaAlimento = false;
      $scope.habilitaEnvio = false;
    }else{
      var id_tipoMuerstreo = valor.id_tipoMuestreo;
    }

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

 // -----------------------------------------------------------------------------------------

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
      validaTrader(usuario);
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

  function validaTrader(usuario){
    if (usuario.trader === true) {
      $scope.habilitaTrader = false;
    }else {
      $scope.habilitaTrader = true;
    }
  }

  $scope.cargarModalHarina = function(){

    $scope.retiro = "muestreo";

    $http.get('/api/traders').success(function(trader){
      $scope.listaTodoTraders = trader;
    });

    $http.get('/api/trader').success(function(proveedor){
      $scope.listaTraders = proveedor;
    });

    var id_materia = 1;
    $http.get('/api/materiaPrima/' + id_materia).success(function(materia){
      $scope.listarMateriaPrima = materia;
    });

    $http.get('/api/traerBodega').success(function(bodega){
      $scope.listarBodegas = bodega;
    });

    $http.get('/api/pais').success(function(pais){
      $scope.listarPaises = pais;
    });

  }

 // ----------------------------------------------------------------------------------

   $scope.mostrarAceite = false;
   $scope.mostrarGranos = false;
   $scope.mostrarAnalisis = false;
   $scope.mostrarMuestreo = false;
   $scope.mostrarTipo = false;

   function habilitarCampos(valor){

     if (valor === null) {
       $scope.mostrarAceite = false;
       $scope.mostrarGranos = false;
       $scope.mostrarAnalisis = false;
       $scope.mostrarMuestreo = false;
       $scope.mostrarTipo = false;
     }else{
       var idTipo = valor.id_tipoMuestreo;
     }

     if (idTipo === 7 || idTipo === 8) {
       $scope.mostrarAnalisis = false;
     }else {
       $scope.mostrarAnalisis = true;
       $scope.mostrarMuestreo = true;
       $scope.mostrarTipo = true;
     }

     if (idTipo === 7) {
       $scope.mostrarAceite = true;
       $scope.mostrarGranos = false;
     }else if (idTipo === 8) {
       $scope.mostrarAceite = false;
       $scope.mostrarGranos = true;
     }else {
       $scope.mostrarAceite = false;
       $scope.mostrarGranos = false;
       $scope.mostrarTipo = true;
     }
   }

  //  ------------------------------------------------------------------------------

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

  // ----------------------------------------------------------------------------------

  $scope.cargarModalMuestreo = function(valor){

    habilitarCampos(valor);
    $scope.retiro = "muestreo";
    $scope.listaTipoAnalisis = [];

    $http.get('/api/traders').success(function(trader){
      $scope.listaTodoTraders = trader;
    });

    $http.get('/api/traerBodega').success(function(bodega){
      $scope.listarBodegas = bodega;
    });

    $http.get('/api/pais').success(function(pais){
      $scope.listarPaises = pais;
    });

    var id_materia = 2;
    $http.get('/api/materiaPrima/' + id_materia).success(function(materia){
      $scope.listarMateriaPrima = materia;
    });

    $http.get('/api/trader').success(function(proveedor){
      $scope.listaTraders = proveedor;
    });

    var id_tipoMuestreo = valor.id_tipoMuestreo;
    $http.get('/api/listarTipoAnalisis/' + id_tipoMuestreo).success(function(response){
      $scope.listaTipoAnalisis = response;
    });

  }

  // -----------------------------------------------------------------------------------

  $scope.mostrarAlimentos = false;
  $scope.mostrarSubAlimentos = false;
  $scope.mostrarSubAnalisis = false;

  $scope.SeleccionAnalisis = function(analisis){

    $scope.listaSubAnalisis = [];

    if (analisis.id_tipoAnalisis === 2) {
      $scope.mostrarAlimentos = true;
      $scope.mostrarSubAlimentos = false;
      $scope.mostrarSubAnalisis = false;
      $http.get('/api/listarAlimentosRsa').success(function(respuesta){
        $scope.listaAlimentosRsa = respuesta;
      })
    }else{
      $scope.mostrarAlimentos = false;
      $scope.mostrarSubAlimentos = false;
      $scope.mostrarSubAnalisis = true;
      var id_tipoAnalisis = analisis.id_tipoAnalisis;
      $http.get('/api/listarSubAnalisis/' + id_tipoAnalisis).success(function(response){
        $scope.listaSubAnalisis = response;
      })
    }
  }

  $scope.SeleccionAlimento = function(alimento){
    $scope.listaSubAnalisis = [];
    if (alimento != 18) {
      var id_tipoAlimento = alimento;
      $scope.mostrarAlimentos = true;
      $scope.mostrarSubAlimentos = true;
      $scope.mostrarSubAnalisis = true;
      $http.get('/api/listarSubAlimentoRsa/' + id_tipoAlimento ).success(function(respuesta){
        $scope.listaSubAlimentos = respuesta;
      })
    }else {
      $scope.mostrarAlimentos = true;
      $scope.mostrarSubAlimentos = false;
      $scope.mostrarSubAnalisis = true;
      $http.get('/api/listarConserva').success(function(response){
        $scope.listaSubAnalisis = response;
      })
    }
  }

  $scope.SeleccionSubAlimento = function(sub){
    $scope.listaSubAnalisis = [];
    var id_subAlimento = sub;
    $http.get('/api/listarAnalisisSubAlimento/' + id_subAlimento).success(function(response){
      $scope.listaSubAnalisis = response;
    })
    $scope.mostrarSubAnalisis = true;
  }

  // ---------------------------------------------------------------------------

  $scope.cargarModalAlimento = function(valor){

    var id_tipoMuestreo = valor.id_tipoMuestreo;
    $scope.retiro = "muestreo";
    $scope.listaSubAnalisis = [];
    $scope.listaAnalisis = [];

    $http.get('/api/listarTipoAnalisis/' + id_tipoMuestreo).success(function(response){
      $scope.listaTipoAnalisis = response;
    });

  }


  //Metodos Modal
  //-----------------------------------------------------------------------------------------------------------------//
  $scope.agregarListaAnalisis = function(tipoAnalisis, subanalisis, alimentosRSA, subAlimentos){

    var lista = [];

    if ($scope.listaAnalisis === undefined) {
      var listaAux = [];
    }else {
      var listaAux = $scope.listaAnalisis;
    }

    for (var i = 0; i < subanalisis.length; i++) {
      if (subanalisis[i].selAnalisis === true) {
        var nuevo = {nro: i, 'subAnalisis': subanalisis[i].descripcion};
        lista.push(nuevo);
      }
    }

    if (tipoAnalisis.id_tipoAnalisis === 2) {
      var nuevoAux = {'tipoAnalisis': tipoAnalisis, 'alimentosRSA':alimentosRSA, 'subAlimentos': subAlimentos, 'lista': lista, 'cantidad': lista.length};
    }else {
      var nuevoAux = {'tipoAnalisis': tipoAnalisis, 'lista': lista, 'cantidad': lista.length};
    }

    var valida = 0;
    var cont = 0;

    if (listaAux[0] === undefined) {
      listaAux.push(nuevoAux);
    }else {
      for (var i = 0; i < listaAux.length; i++) {
        if (listaAux[i].tipoAnalisis.id_tipoMuestreo === nuevoAux.tipoAnalisis.id_tipoMuestreo) {
          valida = i;
          cont++;
          break;
        }
      }

      if (cont != 0) {
        listaAux.splice(valida, 1, nuevoAux);
      }else {
        listaAux.push(nuevoAux);
      }
    }
    $scope.listaAnalisis = listaAux;
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



  $scope.mostrar = function(index, lista, listaSubAnalisis){
    var id = lista[index].tipoAnalisis;
    var alimento = lista[index].alimentosRSA;
    var subAlimentos = lista[index].subAlimentos;
    var lista = lista[index].lista;
    SeleccionAnalisis(id, alimento, subAlimentos, lista, listaSubAnalisis);
    $scope.$on('respuesta', function(event, response) {
      $scope.listaSubAnalisis = response;
    });

  }

  $scope.remover = function(index, lista){
    lista.splice(index, 1);
  }

  function SeleccionAnalisis(analisis, alimento, subAlimentos, lista){

    $scope.listaSubAnalisis = [];
    var respuesta;
    if (analisis.id_tipoAnalisis === 2) {
      $scope.mostrarAlimentos = true;
      $scope.mostrarSubAlimentos = true;
      $scope.mostrarSubAnalisis = true;
      $scope.alimentosRsa = alimento;
      $scope.subAlimentosRsa = subAlimentos;
      var id_subAlimento = subAlimentos;
      $http.get('/api/listarAnalisisSubAlimento/' + id_subAlimento).success(function(response){
        for (var i = 0; i < response.length; i++) {
          for (var j = 0; j < lista.length; j++) {
            if (response[i].descripcion === lista[j].subAnalisis) {
              response[i].selAnalisis = true;
            }
          }
        }
        $scope.$emit('respuesta', response);
      })
    }else{
      $scope.mostrarAlimentos = false;
      $scope.mostrarSubAlimentos = false;
      $scope.mostrarSubAnalisis = true;
      var id_tipoAnalisis = analisis.id_tipoAnalisis;
      $http.get('/api/listarSubAnalisis/' + id_tipoAnalisis).success(function(response){
        for (var i = 0; i < response.length; i++) {
          for (var j = 0; j < lista.length; j++) {
            if (response[i].descripcion === lista[j].subAnalisis) {
              response[i].selAnalisis = true;
            }
          }
        }

        $scope.$emit('respuesta', response);
      })
    }
  }
  //-----------------------------------------------------------------------------------------------------------------//


























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

})

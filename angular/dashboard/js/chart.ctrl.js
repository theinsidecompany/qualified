app.controller('chart1', function ($scope, $rootScope, $http) {

  //Funcion que trae todas las solicitudes de la base de datos.
  //-----------------------------------------------------------------------------------//
  traerSolicitudesFiltro();

  function traerSolicitudesFiltro(){
    var id_usuario = $rootScope.loggedUser.id_usuario;
    $http.get('/api/solicitud/' + id_usuario).success(function(response){
      $rootScope.$emit("solicitudes", response);
    });
  };
  //-----------------------------------------------------------------------------------//

  traerAvisosFiltro();
  //Funcion que carga la lista de avisos del usuario
  //-----------------------------------------------------------------------------------//
  function traerAvisosFiltro(){
    $rootScope.chatUsers = [];
    var id_usuario = $rootScope.loggedUser.id_usuario;
    $http.get('/api/avisos/' + id_usuario).success(function(response){
      if (response[0] === undefined) {
      }else {
        for (var i = 0; i < response[0].chatUsers.length; i++) {
          $rootScope.chatUsers.splice(0, 0, response[0].chatUsers[i]);
        }
      }
    })
  }
  //-----------------------------------------------------------------------------------//


  $rootScope.$on("solicitudes", function(event, response){
    var finalizados = 0;
    var pendiente = 0;
    var aprovacion = 0;

    for (var i = 0; i < response.length; i++) {
      if (response[i].estado === 'Finalizado') {
        finalizados++;
      }else if (response[i].estado === 'En aprobacion') {
        aprovacion++;
      }else {
        pendiente++;
      }
    }

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false

        }, title: {
          text: ''
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true
            },
            showInLegend: true
          }
        }
      },
      series: [{
        type: 'pie',
        data: [
          ['En Proceso', pendiente],
          ['Finalizados', finalizados],
          ['En Aprobación', aprovacion]
        ]
      }],
      loading: false
    }
  });
});


app.controller('chart2', function ($scope, $rootScope, $http) {

  $rootScope.$on("solicitudes", function(event, response){
    var lista = [];
    for (var i = 0; i < response.length; i++) {
      for (var j = 0; j < response[i].lote.length; j++) {
        lista.push(response[i].lote[j].materiaPrima.nombreMateriaPrima);
      }
    }
    function eliminarDuplicados(arr) {
      var i,
      len=arr.length,
      out=[],
      obj={},
      num = [];
      for (i=0;i<len;i++) {
        obj[arr[i]]=0;
      }
      for (i in obj) {
        out.push(i);
      }
      var listaVacio = [];
      var listaStock = [];
      var cantidad = 0;
      var cantidadvacio = 0;
      for (var i = 0; i < out.length; i++) {
        cantidad = 0;
        cantidadvacio = 0;
        for (var j = 0; j < response.length; j++) {
          for (var k = 0; k < response[j].lote.length; k++) {
            if (out[i] === response[j].lote[k].materiaPrima.nombreMateriaPrima && response[j].lote[k].estadoLab === 'aceptado') {
              cantidad += parseInt(response[j].lote[k].cantidad);
            }
            if (out[i] === response[j].lote[k].materiaPrima.nombreMateriaPrima && response[j].lote[k].estadoLab === 'vacio') {
              cantidadvacio += parseInt(response[j].lote[k].cantidad);
            }
          }
        }
        listaStock.push({materia: out[i] + ' stock', cantidad: cantidad, nombre: out[i]});
        listaVacio.push({materia: out[i] + ' pendiente', cantidad: cantidadvacio, nombre: out[i]});
      }


      var listaBarra = [];
      for (var k = 0; k < out.length; k++) {

        for (var i = 0; i < listaVacio.length; i++) {
          if (out[k] === listaVacio[i].nombre) {
            listaBarra.push(listaVacio[i]);
          }
        }
        for (var j = 0; j < listaStock.length; j++) {
          if (out[k] === listaStock[j].nombre) {
            listaBarra.push(listaStock[j]);
          }
        }
      }

      var listaconteo = [];
      for (var i = 0; i < listaBarra.length; i++) {
        var nuevo = {name: listaBarra[i].materia, data: [listaBarra[i].cantidad], type:"column", id: i};
        listaconteo.push(nuevo);
      }

      $scope.chartConfig = {
        series: listaconteo,
        title: {
          text: ''
        },
        xAxis: {
           categories: ['Materias Primas']
         },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Cantidad Materias Primas'
            }
        },
        chart: {
            type: 'column'
        },
        loading: false,
        size: {}
      }
    }
    eliminarDuplicados(lista);
  });
});

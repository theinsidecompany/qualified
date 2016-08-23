var bultos = Number(bultos - asignados);

  if (desde !== undefined && hasta !== undefined && check === true) {
    var lista = [];
    for (var i = 0; i < sellosInspector.length; i++) {
      if (sellosInspector[i] >= desde && sellosInspector[i] <= hasta) {
        lista.push(sellosInspector[i]);
      }
    }

    if (hasta < desde) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'Hasta menor a desde');
    }else if (lista.length > bultos) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'Sellos seleccionados exeden los bultos');
    }else if (lista[0] === undefined) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'No existen sellos entre dichos rangos');
    }else if (lista.length < bultos) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'Sellos seleccionados son menor a la cantidad de bultos');
    }else if (lista.length === bultos) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.success('Notificacion', 'Asignacion realizada con exito');
      if (utilizados === undefined) {
        var listaNueva = sellosInspector;
        for (var i = 0; i < listaNueva.length; i++) {
          for (var j = 0; j < lista.length; j++) {
            if (listaNueva[i] === lista[j]) {
              listaNueva.splice(i, 1);
            }
          }
        }
        $scope.sellosInspector = listaNueva;
        $scope.sellosUtilizados = lista;
        $scope.colorAsignado = "success";
        $scope.habilitaCheck = false;
        $scope.asignados = lista.length;
      }else {
        var listaNueva = sellosInspector;
        for (var i = 0; i < listaNueva.length; i++) {
          for (var j = 0; j < lista.length; j++) {
            if (listaNueva[i] === lista[j]) {
              listaNueva.splice(i, 1);
            }
          }
        }
        $scope.sellosInspector = listaNueva;
        $scope.sellosUtilizados = utilizados.concat(lista);
        $scope.colorAsignado = "success";
        $scope.habilitaCheck = false;
        $scope.asignados = $scope.sellosUtilizados.length;
      }
    }
  }else if (check === false || check === undefined) {

    if (sellos === undefined) {
      $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
      $notify.setPosition('bottom-left');
      $notify.info('Notificacion', 'Debe seleccionar sellos');
    }else {
      var lista = [];
      for (var i = 0; i < sellosInspector.length; i++) {
        for (var j = 0; j < sellos.length; j++) {
          if (sellosInspector[i] === sellos[j]) {
            lista.push(sellosInspector[i]);
          }
        }
      }

      if (sellos.length > bultos) {
        $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
        $notify.setPosition('bottom-left');
        $notify.info('Notificacion', 'Sellos seleccionados exeden los bultos');
      }else if (sellos.length < bultos) {
        $notify.setTime(3).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
        $notify.setPosition('bottom-left');
        $notify.info('Notificacion', 'Sellos seleccionados son menor a la cantidad de bultos');
      }else if (sellos.length === bultos) {
        if (utilizados === undefined) {
          var listaNueva = sellosInspector;
          for (var i = 0; i < listaNueva.length; i++) {
            for (var j = 0; j < lista.length; j++) {
              if (listaNueva[i] === lista[j]) {
                listaNueva.splice(i, 1);
              }
            }
          }
          $scope.sellosInspector = listaNueva;
          $scope.sellosUtilizados = lista;
          $scope.colorAsignado = "success";
          $scope.habilitaCheck = false;
          $scope.asignados = lista.length;
        }else {
          var listaNueva = sellosInspector;
          for (var i = 0; i < listaNueva.length; i++) {
            for (var j = 0; j < lista.length; j++) {
              if (listaNueva[i] === lista[j]) {
                listaNueva.splice(i, 1);
              }
            }
          }
          $scope.sellosInspector = listaNueva;
          $scope.sellosUtilizados = utilizados.concat(lista);
          $scope.colorAsignado = "success";
          $scope.habilitaCheck = false;
          $scope.asignados = $scope.sellosUtilizados.length;
        }
      }
    }
    $timeout(function() {
      traerSolicitudesFiltro();
    }, 300);
  }

  // $http.get('/api/solicitudUnica/' + modalSol).success(function(respuesta){
  //     $scope.listaLotesModal = respuesta[0].lote;
  // })

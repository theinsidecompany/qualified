app.controller('chart1', function($scope, $rootScope, $http) {

    //Funcion que trae todas las solicitudes de la base de datos.
    //-----------------------------------------------------------------------------------//
    traerSolicitudesFiltro();

    function traerSolicitudesFiltro() {
        var id_usuario = $rootScope.loggedUser.id_usuario;
        $http.get('/api/solicitud/' + id_usuario).success(function(response) {
            $rootScope.$emit("solicitudes", response);
        });
    }
    //-----------------------------------------------------------------------------------//

    traerAvisosFiltro();
    //Funcion que carga la lista de avisos del usuario
    //-----------------------------------------------------------------------------------//
    function traerAvisosFiltro() {
        $rootScope.chatUsers = [];
        var id_usuario = $rootScope.loggedUser.id_usuario;
        $http.get('/api/avisos/' + id_usuario).success(function(response) {
            if (response[0] === undefined) {} else {
                for (var i = 0; i < response[0].chatUsers.length; i++) {
                    $rootScope.chatUsers.splice(0, 0, response[0].chatUsers[i]);
                }
            }
        });
    }
    //-----------------------------------------------------------------------------------//

    $scope.habilitaTipoMuestreo = false;
    $scope.habilitaTotalLote = false;
    $scope.habilitaPorBodega = false;
    $scope.habilitaPorProveedor = false;
    $scope.habilitaPorPlanta = false;
    $scope.habilitaPorPais = false;

    $scope.mostrarDashboard = function(valor) {
        console.log(valor);
        if (valor === 1) {
            $scope.habilitaTipoMuestreo = true;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 2) {
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = true;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 3) {
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = true;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 4) {
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = true;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 5) {
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = true;
            $scope.habilitaPorPais = false;
        } else {
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = true;
        }
    };





    $rootScope.$on("solicitudes", function(event, response) {
        var finalizados = 0;
        var pendiente = 0;
        var aprovacion = 0;

        for (var i = 0; i < response.length; i++) {
            if (response[i].estado === 'Finalizado') {
                finalizados++;
            } else if (response[i].estado === 'En aprobacion') {
                aprovacion++;
            } else {
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
                },
                title: {
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
        };
    });

    $scope.chartConfig2 = {
        series: [{
            name: 'Solicitud 1',
            data: [300],
            type: "column",
            id: 0
        }, {
            name: 'Solicitud 2',
            data: [150],
            type: "column",
            id: 1
        }, {
            name: 'Solicitud 3',
            data: [400],
            type: "column",
            id: 2
        }, {
            name: 'Solicitud 4',
            data: [800],
            type: "column",
            id: 3
        }, {
            name: 'Solicitud 5',
            data: [1000],
            type: "column",
            id: 4
        }, {
            name: 'Solicitud 5',
            data: [80],
            type: "column",
            id: 5
        }],
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Lotes']
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
                text: 'Cantidad Lotes por Solicitudes'
            }
        },
        chart: {
            type: 'column'
        },
        loading: false,
        size: {}
    };

    $scope.chartConfig3 = {
        options: {
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false

            },
            title: {
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
                ['Bodega 1', 1000],
                ['Bodega 2', 500],
                ['Bodega 3', 2000]
            ]
        }],
        loading: false
    };

    $scope.chartConfig4 = {
        options: {
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false

            },
            title: {
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
                ['Kabsa', 1500],
                ['Biomar', 100],
                ['Agrosuper', 600]
            ]
        }],
        loading: false
    };

    $scope.chartConfig5 = {
        options: {
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false

            },
            title: {
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
                ['Planta Maipu', 1500],
                ['Planta Las Condes', 5000],
                ['Planta Santiago', 600]
            ]
        }],
        loading: false
    };

    $scope.chartConfig6 = {
        series: [{
            name: 'España',
            data: [2500],
            type: "column",
            id: 0
        }, {
            name: 'Alemania',
            data: [4000],
            type: "column",
            id: 1
        }, {
            name: 'Chile',
            data: [800],
            type: "column",
            id: 2
        }],
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Paises']
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
                text: 'Cantidad Lotes por País'
            }
        },
        chart: {
            type: 'column'
        },
        loading: false,
        size: {}
    };


});

app.controller('chart2', function($scope, $rootScope, $http) {

    $rootScope.$on("solicitudes", function(event, response) {
        var lista = [];
        for (var i = 0; i < response.length; i++) {
            for (var j = 0; j < response[i].lote.length; j++) {
                lista.push(response[i].lote[j].materiaPrima.nombreMateriaPrima);
            }
        }

        function eliminarDuplicados(arr) {
            var i,
                len = arr.length,
                out = [],
                obj = {},
                num = [];
            for (i = 0; i < len; i++) {
                obj[arr[i]] = 0;
            }
            for (i in obj) {
                out.push(i);
            }
            var listaVacio = [];
            var listaStock = [];
            var cantidad = 0;
            var cantidadvacio = 0;
            for (i = 0; i < out.length; i++) {
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
                listaStock.push({
                    materia: out[i] + ' stock',
                    cantidad: cantidad,
                    nombre: out[i]
                });
                listaVacio.push({
                    materia: out[i] + ' pendiente',
                    cantidad: cantidadvacio,
                    nombre: out[i]
                });
            }


            var listaBarra = [];
            for (var k = 0; k < out.length; k++) {

                for (i = 0; i < listaVacio.length; i++) {
                    if (out[k] === listaVacio[i].nombre) {
                        listaBarra.push(listaVacio[i]);
                    }
                }
                for (j = 0; j < listaStock.length; j++) {
                    if (out[k] === listaStock[j].nombre) {
                        listaBarra.push(listaStock[j]);
                    }
                }
            }

            var listaconteo = [];
            for (i = 0; i < listaBarra.length; i++) {
                var nuevo = {
                    name: listaBarra[i].materia,
                    data: [listaBarra[i].cantidad],
                    type: "column",
                    id: i
                };
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
            };
        }
        eliminarDuplicados(lista);
    });
});



var contTree = 0;
app.controller('chartTree', function($scope, $rootScope, $http, $location) {

    $scope.habilitar1 = false;
    $scope.habilitar2 = false;
    $scope.habilitar3 = false;
    $scope.habilitar4 = false;
    $scope.habilitarGeneral = true;



    //--------------------------------------------------------------------------------------------------------------------------------//

    var data = [{
        "name": "Solicitud Iniciada",
        "id": "0",
        "color": "#058DC7"
    }, {
        "name": "Solicitud 1",
        "id": "0_0",
        "parent": "0",
        "value": 13
    }, {
        "name": "Solicitud 5",
        "id": "0_1",
        "parent": "0",
        "value": 8
    }, {
        "name": "Solicitud 15",
        "id": "0_2",
        "parent": "0",
        "value": 33
    }, {
        "name": "Solicitud 3",
        "id": "0_3",
        "parent": "0",
        "value": 10
    }, {
        "name": "Inspección Asignada",
        "id": "1",
        "color": "#24ED5D"
    }, {
        "name": "Solicitud 34",
        "id": "0_4",
        "parent": "1",
        "value": 22
    }, {
        "name": "Solicitud 12",
        "id": "0_5",
        "parent": "1",
        "value": 12
    }, {
        "name": "Solicitud 18",
        "id": "0_6",
        "parent": "1",
        "value": 10
    }, {
        "name": "Solicitud 25",
        "id": "0_7",
        "parent": "1",
        "value": 5
    }, {
        "name": "Solicitud 2",
        "id": "0_8",
        "parent": "1",
        "value": 18
    }, {
        "name": "Solicitud 4",
        "id": "0_9",
        "parent": "1",
        "value": 30
    }, {
        "name": "Laboratorio",
        "id": "2",
        "color": "#0EF6D3"
    }, {
        "name": "Solicitud 34",
        "id": "0_10",
        "parent": "2",
        "value": 9
    }, {
        "name": "Solicitud 12",
        "id": "0_11",
        "parent": "2",
        "value": 6
    }, {
        "name": "Solicitud 18",
        "id": "0_12",
        "parent": "2",
        "value": 16
    }, {
        "name": "Solicitud 25",
        "id": "0_13",
        "parent": "2",
        "value": 20
    }, {
        "name": "Solicitud 2",
        "id": "0_14",
        "parent": "2",
        "value": 18
    }, {
        "name": "Inspección Transporte",
        "id": "3",
        "color": "#F1C420"
    }, {
        "name": "Solicitud 34",
        "id": "0_15",
        "parent": "3",
        "value": 18
    }, {
        "name": "Solicitud 12",
        "id": "0_16",
        "parent": "3",
        "value": 29
    }, {
        "name": "Solicitud 18",
        "id": "0_17",
        "parent": "3",
        "value": 16
    }, {
        "name": "Solicitud 25",
        "id": "0_18",
        "parent": "3",
        "value": 20
    }, {
        "name": "Solicitud 2",
        "id": "0_19",
        "parent": "3",
        "value": 18
    }];

    $(function() {

        function redirect() {
            window.location = '#/creacionSolicitudHarina';
        }


        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container'
            },
            series: [{
                type: "treemap",
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                dataLabels: {
                    enabled: false
                },
                levelIsConstant: false,
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true
                    },
                    borderWidth: 3
                }],
                data: data,
                events: {
                    click: function() {
                      contTree++;
                      if (contTree == 2) {
                        redirect();
                        contTree = 0;
                      }

                    }
                }
            }],
            subtitle: {
                text: '   '
            },
            title: {
                text: ' '
            }
        });


    });

    //--------------------------------------------------------------------------------------------------------------------------------------//
    $(function() {

      function redirect() {
          window.location = '#/creacionSolicitudHarina';
      }

        var data = [{
            "name": "Solicitud Iniciada",
            "id": "0",
            "color": "#058DC7"
        }, {
            "name": "Solicitud 1",
            "id": "0_0",
            "parent": "0",
            "value": 13
        }, {
            "name": "Solicitud 5",
            "id": "0_1",
            "parent": "0",
            "value": 8
        }, {
            "name": "Solicitud 15",
            "id": "0_2",
            "parent": "0",
            "value": 33
        }, {
            "name": "Solicitud 3",
            "id": "0_3",
            "parent": "0",
            "value": 10
        }, ];
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container1'
            },
            series: [{
                type: "treemap",
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                dataLabels: {
                    enabled: false
                },
                levelIsConstant: false,
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true
                    },
                    borderWidth: 3
                }],
                data: data,
                events: {
                    click: function() {
                      contTree++;
                      if (contTree == 2) {
                        redirect();
                        contTree = 0;
                      }

                    }
                }
            }],
            subtitle: {
                text: 'Click points to drill down'
            },
            title: {
                text: 'Treemap Chart'
            }
        });


    });
    //------------------------------------------------------------------------------------------------------------------------------------//
    $(function() {

      function redirect() {
          window.location = '#/creacionSolicitudHarina';
      }

        var data = [{
            "name": "Inspección Asignada",
            "id": "1",
            "color": "#24ED5D"
        }, {
            "name": "Solicitud 34",
            "id": "0_4",
            "parent": "1",
            "value": 22
        }, {
            "name": "Solicitud 12",
            "id": "0_5",
            "parent": "1",
            "value": 12
        }, {
            "name": "Solicitud 18",
            "id": "0_6",
            "parent": "1",
            "value": 10
        }, {
            "name": "Solicitud 25",
            "id": "0_7",
            "parent": "1",
            "value": 5
        }, {
            "name": "Solicitud 2",
            "id": "0_8",
            "parent": "1",
            "value": 18
        }, {
            "name": "Solicitud 4",
            "id": "0_9",
            "parent": "1",
            "value": 30
        }];
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container2'
            },
            series: [{
                type: "treemap",
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                dataLabels: {
                    enabled: false
                },
                levelIsConstant: false,
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true
                    },
                    borderWidth: 3
                }],
                data: data,
                events: {
                    click: function() {
                      contTree++;
                      if (contTree == 2) {
                        redirect();
                        contTree = 0;
                      }

                    }
                }
            }],
            subtitle: {
                text: 'Click points to drill down'
            },
            title: {
                text: 'Treemap Chart'
            }
        });


    });
    //-----------------------------------------------------------------------------------------------------------------------------------//
    $(function() {

      function redirect() {
          window.location = '#/creacionSolicitudHarina';
      }

        var data = [{
            "name": "Laboratorio",
            "id": "2",
            "color": "#0EF6D3"
        }, {
            "name": "Solicitud 34",
            "id": "0_10",
            "parent": "2",
            "value": 9
        }, {
            "name": "Solicitud 12",
            "id": "0_11",
            "parent": "2",
            "value": 6
        }, {
            "name": "Solicitud 18",
            "id": "0_12",
            "parent": "2",
            "value": 16
        }, {
            "name": "Solicitud 25",
            "id": "0_13",
            "parent": "2",
            "value": 20
        }, {
            "name": "Solicitud 2",
            "id": "0_14",
            "parent": "2",
            "value": 18
        }];
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container3'
            },
            series: [{
                type: "treemap",
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                dataLabels: {
                    enabled: false
                },
                levelIsConstant: false,
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true
                    },
                    borderWidth: 3
                }],
                data: data,
                events: {
                    click: function() {
                      contTree++;
                      if (contTree == 2) {
                        redirect();
                        contTree = 0;
                      }

                    }
                }
            }],
            subtitle: {
                text: 'Click points to drill down'
            },
            title: {
                text: 'Treemap Chart'
            }
        });


    });
    //-------------------------------------------------------------------------------------------------------------------------------------//
    $(function() {

      function redirect() {
          window.location = '#/creacionSolicitudHarina';
      }

        var data = [{
            "name": "Inspección Transporte",
            "id": "3",
            "color": "#F1C420"
        }, {
            "name": "Solicitud 34",
            "id": "0_15",
            "parent": "3",
            "value": 18
        }, {
            "name": "Solicitud 12",
            "id": "0_16",
            "parent": "3",
            "value": 29
        }, {
            "name": "Solicitud 18",
            "id": "0_17",
            "parent": "3",
            "value": 16
        }, {
            "name": "Solicitud 25",
            "id": "0_18",
            "parent": "3",
            "value": 20
        }, {
            "name": "Solicitud 2",
            "id": "0_19",
            "parent": "3",
            "value": 18
        }];
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container4'
            },
            series: [{
                type: "treemap",
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                dataLabels: {
                    enabled: false
                },
                levelIsConstant: false,
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true
                    },
                    borderWidth: 3
                }],
                data: data,
                events: {
                    click: function() {
                      contTree++;
                      console.log(contTree);
                      if (contTree == 2) {
                        redirect();
                        contTree = 0;
                      }

                    }
                }
            }],
            subtitle: {
                text: 'Click points to drill down'
            },
            title: {
                text: 'Treemap Chart'
            }
        });


    });
    //------------------------------------------------------------------------------------------------------------------------//
    $scope.cambioChart = function(valor) {

      contTree = 0;

        if (valor === 1) {
            $scope.habilitar1 = true;
            $scope.habilitar2 = false;
            $scope.habilitar3 = false;
            $scope.habilitar4 = false;
            $scope.habilitarGeneral = false;
        } else if (valor === 2) {
            $scope.habilitar1 = false;
            $scope.habilitar2 = true;
            $scope.habilitar3 = false;
            $scope.habilitar4 = false;
            $scope.habilitarGeneral = false;
        } else if (valor === 3) {
            $scope.habilitar1 = false;
            $scope.habilitar2 = false;
            $scope.habilitar3 = true;
            $scope.habilitar4 = false;
            $scope.habilitarGeneral = false;
        } else if (valor === 4) {
            $scope.habilitar1 = false;
            $scope.habilitar2 = false;
            $scope.habilitar3 = false;
            $scope.habilitar4 = true;
            $scope.habilitarGeneral = false;
        } else {
            $scope.habilitar1 = false;
            $scope.habilitar2 = false;
            $scope.habilitar3 = false;
            $scope.habilitar4 = false;
            $scope.habilitarGeneral = true;
        }

    };


});

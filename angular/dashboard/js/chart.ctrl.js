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
            console.log('entre');
            $scope.habilitaTipoMuestreo = true;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 2) {
            console.log('entre');
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = true;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 3) {
            console.log('entre');
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = true;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 4) {
            console.log('entre');
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = true;
            $scope.habilitaPorPlanta = false;
            $scope.habilitaPorPais = false;
        } else if (valor === 5) {
            console.log('entre');
            $scope.habilitaTipoMuestreo = false;
            $scope.habilitaTotalLote = false;
            $scope.habilitaPorBodega = false;
            $scope.habilitaPorProveedor = false;
            $scope.habilitaPorPlanta = true;
            $scope.habilitaPorPais = false;
        } else {
            console.log('entre');
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
        options: {
            chart: {
                type: 'column',
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
            type: 'column',
            data: [
                ['Lote 1', 100],
                ['Lote 2', 50],
                ['Lote 3', 300]
            ]
        }],
        loading: false
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
                ['Biomar', 5000],
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
        options: {
            chart: {
                type: 'column',
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
            type: 'column',
            data: [
                ['Chile', 5000],
                ['España', 3000],
                ['Alemania', 1500]
            ]
        }],
        loading: false
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


app.controller('chartTree', function($scope, $rootScope, $http){

  $(function () {
    var data = {
            'Inspección de Transporte': {
                'Solicitud 1': {
                    'Cantidad de Lotes': '10',
                },
                'Solicitud 2': {
                    'Cantidad de Lotes': '15',
                }
            },
            'Solicitud Iniciada': {
                'Solicitud 3': {
                    'Cantidad de Lotes': '12',
                },
                'Solicitud 4': {
                    'Cantidad de Lotes': '7',
                }
            },
            'Inspección Asignada': {
                'Solicitud 5': {
                    'Cantidad de Lotes': '16',
                },
                'Solicitud 6': {
                    'Cantidad de Lotes': '13',
                }
            },
            'Laboratorio': {
                'Solicitud 7': {
                    'Cantidad de Lotes': '11',
                },
                'Solicitud 8': {
                    'Cantidad de Lotes': '7',
                }
            }
        },
        points = [],
        regionP,
        regionVal,
        regionI = 0,
        countryP,
        countryI,
        causeP,
        causeI,
        region,
        country,
        cause,
        causeName = {
            'Cantidad de Lotes': 'Cantidad de Lotes',
        };

    for (region in data) {
        if (data.hasOwnProperty(region)) {
            regionVal = 0;
            regionP = {
                id: 'id_' + regionI,
                name: region,
                color: Highcharts.getOptions().colors[regionI]
            };
            countryI = 0;
            for (country in data[region]) {
                if (data[region].hasOwnProperty(country)) {
                    countryP = {
                        id: regionP.id + '_' + countryI,
                        name: country,
                        parent: regionP.id
                    };
                    points.push(countryP);
                    causeI = 0;
                    for (cause in data[region][country]) {
                        if (data[region][country].hasOwnProperty(cause)) {
                            causeP = {
                                id: countryP.id + '_' + causeI,
                                name: causeName[cause],
                                parent: countryP.id,
                                value: Math.round(+data[region][country][cause])
                            };
                            regionVal += causeP.value;
                            points.push(causeP);
                            causeI = causeI + 1;
                        }
                    }
                    countryI = countryI + 1;
                }
            }
            regionP.value = Math.round(regionVal);
            points.push(regionP);
            regionI = regionI + 1;
        }
    }
    $('#container').highcharts({
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
                enabled: false
            },
            levelIsConstant: false,
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 2
            }],
            data: points
        }],
        subtitle: {
            text: ''
        },
        title: {
            text: ''
        }
    });
});

});

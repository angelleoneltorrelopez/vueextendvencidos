var app = new Vue({

	el: "#app",
	data: {
		errorMessage: "",
		successMessage : "",
		ale: false,
		alert2: false,
		dialog: false,
		producto: [],
		prod: [],
		produ: [],
		casa: [],
		proveedor: [],
		menu2: false,
    date: new Date().toISOString().substr(0, 10),
		search: [],
		newproducto: {producto: 0, casa: 0, proveedor: 0, politica: 0 , caducidad: "", lote: "" , estado: 0, usuario: 'angel'},
		headers: [
        { text: 'Codigo', value: 'idproductos', width: '10%' },
        { text: 'Producto', align: 'left', value: 'nombre_productos'}
      ],
			headersingreso: [
				{ text: 'Codigo', value: 'Id', width: '10%' },
				{ text: 'Producto', align: 'left', value: 'nombre_productos'},
				{ text: 'Casa', align: 'left', value: 'nombrecasa'},
				{ text: 'Proveedor', align: 'left', value: 'nombreprov'},
				{ text: 'Politica', align: 'left', value: 'Politica'},
				{ text: 'Fecha', align: 'left', value: 'Caducidad'},
				{ text: 'Estado', align: 'left', value: 'Estado'},
	      ],
		usuario: [{estado: 'angel', valor: 'angel'},
									{estado: 'keyla', valor: 'keyla'}],
		dataestado: [{estado: 'Activo', valor: 0},
								{estado: 'Inactivo', valor: 1}],
		politica: [{estado: 'No devolucion', valor: -1},
								{estado: 'En el mes', valor: 0},
								{estado: '1', valor: 1},
								{estado: '2', valor: 2},
								{estado: '3', valor: 3},
								{estado: '4', valor: 4},
								{estado: '5', valor: 5},

							],

		},//---- Fin data


					mounted: function () {
						this.getAllCasas();
						this.getAllProveedores();
					//	this.getAllproducto();

					},


	methods: {//------------------------------------metodos------------------------------------------------
		customSort(items, index, isDescending) {
          // The following is informations as far as I researched.
          // items: 'food' items
          // index: Enabled sort headers value. (black arrow status).
          // isDescending: Whether enabled sort headers is desc
          items.sort((a, b) => {
              if (index === 'Caducidad') {
                  if (isDescending) {
                      return b.Caducidad - a.Caducidad;
                  } else {
                      return a.Caducidad - b.Caducidad;
                  }
              }
          });
          return items;
        },

		guardar(){
			if(app.newproducto.producto > 0 && app.newproducto.casa > 0 && app.newproducto.proveedor > 0 ){
			var formData = app.toFormData(app.newproducto);
			axios.post("http://52.88.116.84/vuejs/api.php?action=create", formData)
				.then(function(response){
					var us = app.newproducto.usuario;
					var pro = app.newproducto.producto;
					app.newproducto = {producto: 0, casa: 0, proveedor: 0, politica: 0 , caducidad: "", lote: "" , estado: 0};
					app.newproducto.usuario = us;
					if (response.data.error) {
						app.errorMessage = response.data.message;
					}else{
						app.successMessage = app.producto + response.data.message;
						app.getAllingreso(pro);
						app.producto = "";
						app.search = "";
						app.ale = true;
					}
				});
			}
			else {
				app.errorMessage = "Llenar todos los campos"
				app.alert2 = true;
			}
		},


		formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
			this.newproducto.caducidad += '-01'
      return `${'01'}/${month}/${year}`
    },

		send(item){
			app.producto = item.nombre_productos,
			app.newproducto.producto = item.idproductos,
			app.dialog = false,
			app.getAllingreso(item.idproductos)
		},
		//------------------------------------Todos Usuarios-----------------------------------------------
		getAllCasas: function(){
		axios.get("http://52.88.116.84/vuejs/api.php?action=read")
    .then(function(response){
				if (response.data.error) {
					app.errorMessage = response.data.message;
				}else{
					app.casa = response.data.casa;
				}
			});
		},//------------------------------------Fin Todos Usuarios-----------------------------------------

		//------------------------------------Todos Usuarios-----------------------------------------------
		getAllProveedores: function(){
		axios.get("http://52.88.116.84/vuejs/api.php?action=readproveedor")
		.then(function(response){
				if (response.data.error) {
					app.errorMessage = response.data.message;
				}else{
					app.proveedor = response.data.proveedor;
				}
			});
		},//------------------------------------Fin Todos Usuarios-----------------------------------------

		//------------------------------------Todos Usuarios-----------------------------------------------
		getAllproducto: function(){
		axios.get("http://52.88.116.84/vuejs/api.php?producto=" + app.search)
		.then(function(response){
				if (response.data.error) {
					app.errorMessage = response.data.message;
				}else{
					app.prod = response.data.producto;
				}
			});
		},

		getAllingreso: function(idproducto){
		axios.get("http://52.88.116.84/vuejs/api.php?ingreso=" + idproducto)
		.then(function(response){
				if (response.data.error) {
					app.errorMessage = response.data.message;
				}else{
					app.produ = response.data.ingreso;
				}
			});
		},

		//------------------------------------Fin Todos Usuarios-----------------------------------------
		toFormData: function(obj){
			var form_data = new FormData();
					for ( var key in obj ) {
							form_data.append(key, obj[key]);
					}
					return form_data;
		},
	},//------------------------------------fin metodos------------------------------------------------
	computed: {
    computedDateFormatted () {
      return this.formatDate(this.newproducto.caducidad)
    },
	}
});

var app = angular.module('realTime', ['ngAlertify','ui.router', 'ngMaterial', 'ui.bootstrap','firebase','jsTree.directive']);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('detalle-proyecto', {
		  url: '/detalle-proyecto/{id}',
		  templateUrl: '/detalle-proyecto.html',
		  controller: 'detailProjectCtrl',
		  resolve: {
			post: ['$stateParams', 'projects', function($stateParams, projects) {
				return projects.getProject($stateParams.id);
			}]
		  }
		});
	
	$stateProvider
		.state('usuario', {
		  url: '/usuario/{id}',
		  templateUrl: '/usuario.html',
		  controller: 'UserCtrl',
		  resolve: {
			post: ['$stateParams', 'projects', function($stateParams, projects) {
				return projects.getUser($stateParams.id);
			}]
		  }
		});
	
	$stateProvider
		.state('usuarios', {
		  url: '/usuarios',
		  templateUrl: '/usuarios.html',
		  controller: 'UsersCtrl',
		  resolve: {
			users: ['$stateParams', 'projects', function($stateParams, projects) {
				
					return projects.getUsers();
			}]
		  }
		});
	
	$stateProvider
		.state('proyectos-publicos', {
		  url: '/proyectos-publicos',
		  templateUrl: '/proyectos-publicos.html',
		  controller: 'PublicCtrl',
		  resolve: {
			post: ['projects', function(projects){
			  return projects.getAllPublic();
			}]
		  }
		});
	
	$stateProvider
		.state('proyectos', {
		  url: '/proyectos',
		  templateUrl: '/proyectos.html',
		  controller: 'MainCtrl',
		  resolve: {
			post: ['projects', function(projects){
				return projects.getAll();
			}]
		  }
		});
		
	$stateProvider
		.state('agregar-proyectos', {
		  url: '/agregar-proyectos',
		  templateUrl: '/agregar-proyectos.html',
		  controller: 'addProjectCtrl'
		});
		
	$stateProvider
		.state('editar-proyectos', {
		  url: '/editar-proyectos/{id}',
		  templateUrl: '/editar-proyectos.html',
		  controller: 'editProjectCtrl',
		  resolve: {
			//if($stateParams.id != null)
			post: ['$stateParams', 'projects', function($stateParams, projects) {
			  return projects.get($stateParams.id);
			}]
		  }
		});
		
	$stateProvider
		.state('proyecto', {
		  url: '/proyecto/{id}',
		  templateUrl: '/proyecto.html',
		  controller: 'ProjectsCtrl',
		  resolve: {
			post: ['$stateParams', 'projects', function($stateParams, projects) {
				/*if(projects.users.length==0)
					projects.getUsers();*/
			  return projects.get($stateParams.id);
			}]
		  }
		});


  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/home.html',
      controller: 'HomeCtrl'
    });

	$stateProvider
	.state('login', {
	  url: '/login',
	  templateUrl: '/login.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
		if(auth.isLoggedIn()){
		  $state.go('home');
		}
	  }]
	});
	
	$stateProvider
	.state('register', {
	  url: '/register',
	  templateUrl: '/register.html',
	  controller: 'AuthCtrl',
	  onEnter: ['$state', 'auth', function($state, auth){
		if(auth.isLoggedIn()){
		  $state.go('home');
		}
	  }]
	});
	
	$stateProvider
	.state('editar-usuario', {
	  url: '/register/{id}',
	  templateUrl: '/register.html',
	  controller: 'AuthCtrl',
		  resolve: {
			post: ['$stateParams', 'auth', function($stateParams, auth) {
			  return auth.currentPayload();
			}]
		  }
	});
	
  $urlRouterProvider.otherwise('/');
}]);


//Controller for projectDetails/{:id}
app.controller('HomeCtrl', [

'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
function( $scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http){
//jQuery is required to run this code
$( document ).ready(function() {

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
}]);


//Controller for /home
app.controller('detailProjectCtrl', [
'post',
'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
function(post, $scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http){
	$scope.projectF = post;
}]);



//Controller for user/{:id}
app.controller('UserCtrl', [
'post',
'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
function(post,$scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http){
	$scope.user = post;
	console.log(post);
	
}]);

//Controller for p[ublic projects]
app.controller('PublicCtrl', [
'post',
'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
function(post,$scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http){
	
    $scope.projects = post.data;
	
	
}]);

//Controller for /users
app.controller('UsersCtrl', [

'users',
'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
function(users,$scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http){
	
    $scope.allContacts = [];
    $scope.user = auth.currentPayload();
    for(var i=0;i<users.data.length;i++){
        if(users.data[i]._id != $scope.user._id)
                $scope.allContacts.push(users.data[i]);    
    }
}]);


//Controller for agregarproyecto
app.controller('addProjectCtrl', [

'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
function($scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http){
	$scope.iconos = [
	{ url: 'ico-agenda'},
	{ url: 'ico-blackboard'},
	{ url: 'ico-blackboard-eraser'},
	{ url: 'ico-book'},
	{ url: 'ico-briefcase'},
	{ url: 'ico-calendar'},
	{ url: 'ico-computer'},
	{ url: 'ico-ebook'},
	{ url: 'ico-file'},
	{ url: 'ico-folder'}];
    
    
    
	
	$scope.addProject = function(){
		  if(!$scope.nombre || $scope.nombre === '' ||
			 !$scope.descripcion ||
			 !$scope.icono) { 
				$scope.error =
					new Object({message:"Por favor llene todos los campos"});
					return; 
		  }
		  project = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			icono: $scope.icono,
			privado: $scope.privado,
			colaboradores: $scope.colaboradores
		  };
		  if($scope._id) 
			  project._id = $scope._id;
		  else {
			  project._id = null;
			  project.colaboradores = [auth.currentId()];
		  }
		
        
        $scope.saveCollaborators = function(){
		console.log("entra");
            
		proyecto = angular.copy($scope.project);
		usuariosTotales = $scope.users;
		proyecto.colaboradores = angular.copy($scope.contacts);
		
		
		proyecto.colaboradores.splice(0,0,auth.currentPayload());
	
		projects.create(proyecto).error(function(error){
			$scope.error = error;
			if(!$scope.error.message)
				if($scope.error.indexOf("duplicate key") != -1)
					$scope.error =
						new Object({message:"El nombre del proyecto ya esta registrado, favor de intentar con otro nombre de proyecto."});
			
			}).then(function(){
			 
				for(i=0; i < proyecto.colaboradores.length; i++){
					
					if(proyecto.colaboradores[i].proyectos.indexOf(proyecto._id) == -1) 
						proyecto.colaboradores[i].proyectos.push(proyecto._id);
					
					auth.updateUserProjects(proyecto.colaboradores[i])
						.error(function(error){
						
							$scope.error = error;
							if(!$scope.error.message)
								if($scope.error.indexOf("duplicate key") != -1)
									$scope.error =
										new Object({message:"El nombre de usuario ya esta registrado, favor de intentar con otro nombre de usuario."});
						}).then(function(){
							
							$scope.error =
								new Object({message:"Los colaboradores fueron agregados exitosamente."});
						});
				}
			});;
	};
		
			  
	  
		  projects.create(project).error(function(error){
			$scope.error = error;
			if(!$scope.error.message)
				if($scope.error.indexOf("duplicate key") != -1)
					$scope.error =
						new Object({message:"El nombre del proyecto ya esta registrado, favor de intentar con otro nombre de proyecto."});
			
			}).then(function(){
				debugger;
				if(project._id){
					$state.go('proyectos');
				}
				else{
					var idProyectoActual = projects.projects[projects.projects.length-1]._id;
					var usuarioLogueado= auth.currentPayload();
					if(!usuarioLogueado.proyectos)
						usuarioLogueado.proyectos = [];
					usuarioLogueado.proyectos.push(idProyectoActual);
					auth.updateUserProjects(usuarioLogueado)
							.error(function(error){
								$scope.error = error;
								
							}).then(function(){
								debugger;
								$state.go('proyectos');
								
							});
				}
			});;
		  $scope.nombre = '';
		  $scope.descripcion = '';
		  $scope._id = null;
	};
    
    
    
	
	
}]);


//Controller for agregarproyecto/:id
app.controller('editProjectCtrl', [
'post',
'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
function(post,$scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http){
	
	$scope.iconos = [
	{ url: 'ico-agenda'},
	{ url: 'ico-blackboard'},
	{ url: 'ico-blackboard-eraser'},
	{ url: 'ico-book'},
	{ url: 'ico-briefcase'},
	{ url: 'ico-calendar'},
	{ url: 'ico-computer'},
	{ url: 'ico-ebook'},
	{ url: 'ico-file'},
	{ url: 'ico-folder'}];
	
	$scope.project = post;
	$scope.users = projects.users;
	var colaboradores = [];
    
	if($scope.project){
		$scope._id = $stateParams.id;
		$scope.nombre = $scope.project.nombre;
		$scope.descripcion = $scope.project.descripcion;
		$scope.icono = $scope.project.icono;
		$scope.privado = $scope.project.privado + "";
		$scope.colaboradores =  $scope.project.colaboradores;
		for(i=0; i< $scope.project.colaboradores.length; i++){
			for(j=0; j< $scope.users.length; j++){
				if($scope.project.colaboradores[i]._id == $scope.users[j]._id)
					colaboradores.push($scope.users[j]);
			}
		}
	}
    
    var cachedQuery, lastSearch, pendingSearch, cancelSearch = angular.noop;
    projects.getUsers();
	//console.log(projects.users);
	$scope.contacts = projects.users;
    console.log("prousere",projects.users);
    
	
	$scope.loadContacts = function(){
		return $scope.contacts;
	}
    
    console.log("colab",colaboradores);
    
	//$scope.allContacts = $scope.loadContacts();
	$scope.contacts = colaboradores;
	
	$scope.filterSelected = false;
	$scope.querySearch = function(criteria){
		cachedQuery = criteria;
      return cachedQuery ? $scope.allContacts.filter(createFilterFor(cachedQuery)) : [];
	}
	
	function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.username.toLowerCase().indexOf(lowercaseQuery) != -1);
      };

    }
	
	if($scope.user)
		$scope.user.colaboradorIndependiente = $scope.user.nombreInstitucion == 'Colaborador Independiente';
    
	
	
	$scope.getUsers = function(){
		projects.getUsers();
	}
    

    $scope.saveCollaborators = function(){
		
		proyecto = angular.copy($scope.project);
        console.log($scope.proyect);
		usuariosTotales = $scope.users;
		proyecto.colaboradores = angular.copy($scope.contacts);
		
		
		proyecto.colaboradores.splice(0,0,auth.currentPayload());
	
		projects.create(proyecto).error(function(error){
			$scope.error = error;
			if(!$scope.error.message)
				if($scope.error.indexOf("duplicate key") != -1)
					$scope.error =
						new Object({message:"El nombre del proyecto ya esta registrado, favor de intentar con otro nombre de proyecto."});
			
			}).then(function(){
			  
				for(i=0; i < proyecto.colaboradores.length; i++){
					
					if(proyecto.colaboradores[i].proyectos.indexOf(proyecto._id) == -1) 
						proyecto.colaboradores[i].proyectos.push(proyecto._id);
					
					auth.updateUserProjects(proyecto.colaboradores[i])
						.error(function(error){
							
							$scope.error = error;
							if(!$scope.error.message)
								if($scope.error.indexOf("duplicate key") != -1)
									$scope.error =
										new Object({message:"El nombre de usuario ya esta registrado, favor de intentar con otro nombre de usuario."});
						}).then(function(){
							
							$scope.error =
								new Object({message:"Los colaboradores fueron agregados exitosamente."});
						});
				}
			});;
	};
	
	$scope.addProject = function(){
		  if(!$scope.nombre || $scope.nombre === '' ||
			 !$scope.descripcion ||
			 !$scope.icono) { 
				$scope.error =
					new Object({message:"Por favor llene todos los campos"});
					return; 
		  }
		  project = {
			nombre: $scope.nombre,
			descripcion: $scope.descripcion,
			icono: $scope.icono,
			privado: $scope.privado,
			colaboradores: $scope.colaboradores
		  };
		  if($scope._id) 
			  project._id = $scope._id;
		  else {
			  project._id = null;
			  project.colaboradores = [auth.currentId()];
		  }
		
		
			  
	  
		  projects.create(project).error(function(error){
			$scope.error = error;
			if(!$scope.error.message)
				if($scope.error.indexOf("duplicate key") != -1)
					$scope.error =
						new Object({message:"El nombre del proyecto ya esta registrado, favor de intentar con otro nombre de proyecto."});
			
			}).then(function(){
				debugger;
				if(project._id){
					$state.go('proyectos');
				}
				else{
					var idProyectoActual = projects.projects[projects.projects.length-1]._id;
					var usuarioLogueado= auth.currentPayload();
					if(!usuarioLogueado.proyectos)
						usuarioLogueado.proyectos = [];
					usuarioLogueado.proyectos.push(idProyectoActual);
					auth.updateUserProjects(usuarioLogueado)
							.error(function(error){
								$scope.error = error;
								
							}).then(function(){
								
								$state.go('proyectos');
								
							});
				}
			});;
		  $scope.nombre = '';
		  $scope.descripcion = '';
		  $scope._id = null;
	};
	
	
}]);


app.controller('MainCtrl', [
'$scope',
'$state',
'auth',
'projects',
'post',
function($scope, $state, auth, projects,post){
   
    console.log(post.data);
    $scope.projects = [];
    $scope.Allprojects = post.data;
   /*post.success(function(data){
       $scope.Allprojects = data;
       console.log('all projects',$scope.Allprojects);
   });*/
  
  
   if($state.current.name == "home")
	projects.users = [];
    
    $scope.user = auth.currentPayload();
     console.log('actual user',$scope.user);
  
  $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: 'http://lorempixel.com/1300/700/business',
	  text: 'Mientras se trabaja en grandes proyectos de desarrollo a gran escala todos los ingenieros de software se encuentran en algún momento, con la necesidad de utilizar un sistema de control de código fuente con el fin de añadir o revertir cambios en el código. Además que los proyectos de software que implican una multitud de programadores requieren de un sistema que permita la colaboración asíncrona para lograr un desarrollo exitoso. '
    },
    {
      image: 'http://lorempixel.com/1300/700/technics',
	  text: 'La tendencia de desarrollo tecnológico en la ingeniería de software ha ido mejorando, donde el diseño de software comenzó a moverse desde el escritorio a la web. Hoy en día, muchos IDEs (Entornos de Desarrollo Integrado)  existen en el mercado como Eclipse, Visual Studio, etc., pero IDEs basados en el escritorio todavía tienen significativas desventajas, como lo es el tiempo necesario para la configuración y la instalación de plugins necesarios para ejecutar el proyecto. Este problema podría ser una enorme pérdida de tiempo cuando hay muchos dispositivos que tienen que ser configurados. Muchas aplicaciones de software se han ejecutado en la nube, y el uso de un navegador web como una interfaz de usuario permite acceso ubicuo, colaboración instantánea, y evita la instalación y configuración en computadoras de escritorio'
    },
    {
      image: 'http://lorempixel.com/1300/700/people',
	  text: 'Una de las tecnologías que se utilizan para la colaboración instantánea es el uso del IDE (como la programación en parejas). La programación en parejas es la práctica de tener dos programadores que acceden y trabajan en el mismo código en un solo medio ambiente de desarrollo. En la programación en parejas, los programadores tienen la capacidad de crear, editar y borrar el código fuente en tiempo real. La programación en parejas podría resolver el problema de sincronización de código con el fin de mantenerlo vigente, y siempre que el código cambie cualquier programador que esté trabajando en el mismo proyecto podría ver quien realizó el cambio'
    },
    {
      image: 'http://lorempixel.com/1300/700/city',
	  text: 'Las tecnologías de colaboración podrían ayudar a los programadores a trabajar juntos mientras corrigen errores o discuten el programa en un mismo entorno único pero en diferentes áreas geográficas. Por lo tanto, es necesario hacer una aplicación que pueda mejorar el rendimiento en la etapa de desarrollo y ofrecer soluciones como la colaboración en tiempo real.'
    }
  ];
    
    
    //get all projects that this user is collaborator
    for(var i =0; i < $scope.Allprojects.length;i++){
        for(var j =0; j < $scope.Allprojects[i].colaboradores.length;j++){
            if($scope.Allprojects[i].colaboradores[j] == $scope.user._id)
                {
                    //console.log('este usuario es colaborador de ',$scope.Allprojects[i]);    
                    $scope.projects.push($scope.Allprojects[i]);
                }
                
        }
    }
  
	
	$scope.deleteProject = function(id){
	  projects.delete(id).error(function(error){
		$scope.error = error;
		if(!$scope.error.message)
			$scope.error =
				new Object({message:"Ocurrió un error al eliminar el proyecto."});
			
		}).then(function(){
		  //$state.go('proyectos');
		  
		  $scope.error =
				new Object({message:"Proyecto eliminado correctamente."});
		  /*if(data.ok == 1)
				alert("Proyecto eliminado correctamente.");
			else
				alert("Ocurrió un error al eliminar el proyecto.");*/
	  });; 
        
        window.location.reload();
	};
	
    $scope.unasignProjectToUser = function(id, colaboradores){
	  var proyectos = [];
	  for(i=0;i<$scope.projects.length;i++){
		  proyectos.push($scope.projects[i]._id);
	  }
	  
	  projects.unasignProjectToUser(
	  {
		  idProyecto: id,
		  colaboradores: colaboradores,
		  idUsuario: auth.currentId(),
		  proyectos: proyectos
	  }).error(function(error){
		$scope.error = error;
		if(!$scope.error.message)
			$scope.error =
				new Object({message:"Ocurrió un error al salir del proyecto."});
			
		}).then(function(){
		  
		  $scope.error =
				new Object({message:"Se salió del proyecto correctamente."});
		  $state.go('proyectos');
	  });; 
        
        window.location.reload();
	};

  
}])

app.controller('ProjectsCtrl', [
'post',
'$scope',
'$stateParams',
'projects',
'$state',
'auth',
'Message',
'$firebaseArray',
'$http',
'alertify',
'$firebaseObject',
'$interval',
'alertify',
function(post, $scope, $stateParams, projects, $state, auth,Message,$firebaseArray,$http,alertify,$firebaseObject,$interval,alertify){

	$scope.iconos = [
	{ url: 'ico-agenda'},
	{ url: 'ico-blackboard'},
	{ url: 'ico-blackboard-eraser'},
	{ url: 'ico-book'},
	{ url: 'ico-briefcase'},
	{ url: 'ico-calendar'},
	{ url: 'ico-computer'},
	{ url: 'ico-ebook'},
	{ url: 'ico-file'},
	{ url: 'ico-folder'}];
	
    
     ///////////////////////////////
	
    $scope.users = {};
    $scope.project = post;
    $scope.allContacts = [];
    
	projects.getUsers().success(function(data){
        
        $scope.users = data;
        var colaboradores = $scope.project.colaboradores;
        $scope.contacts = colaboradores;
        
        $scope.user = auth.currentPayload();
        for(var i=0;i<$scope.users.length;i++){
            if($scope.users[i]._id != $scope.user._id)
                    $scope.allContacts.push($scope.users[i]);    
        }
        
       for(var j=0;j<colaboradores.length;j++){
            for(var k=0;k<$scope.allContacts.length;k++)
               if($scope.allContacts[k]._id == colaboradores[j]._id){
        
                   $scope.allContacts.splice(k,1);
               }
       }
        
    });
    
    
    
	
	$scope.user = projects.user;
	if($scope.user)
		$scope.user.colaboradorIndependiente = $scope.user.nombreInstitucion == 'Colaborador Independiente';
	
	
	
	/*if($scope.project){
		$scope._id = $stateParams.id;
		$scope.nombre = $scope.project.nombre;
		$scope.descripcion = $scope.project.descripcion;
		$scope.icono = $scope.project.icono;
		$scope.privado = $scope.project.privado + "";
		$scope.colaboradores =  $scope.project.colaboradores;
		
		for(i=0; i< $scope.project.colaboradores.length; i++){
			for(j=0; j< $scope.users.length; j++){
				if($scope.project.colaboradores[i] == $scope.users[j]._id)
					colaboradores.push($scope.users[j]);
			}
		}
	}*/
	 
    //allcontactes = all - conlaboraodres
    
   
	
	var cachedQuery, lastSearch, pendingSearch, cancelSearch = angular.noop;
		
    /*for(i=0; i< colaboradores.length; i++){
        colaboradores[i].iconoAvatar = '../images/'+colaboradores[i].iconoAvatar+'.png';   
    }*/
    
   
    
	$scope.filterSelected = false;
	
	$scope.querySearch = function(criteria){
		cachedQuery = criteria;
      return cachedQuery ? $scope.allContacts.filter(createFilterFor(cachedQuery)) : [];
	}
	function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.username.toLowerCase().indexOf(lowercaseQuery) != -1);
      };

    }

 	
	
	$scope.saveCollaborators = function(){
		
		proyecto = angular.copy($scope.project);
		usuariosTotales = $scope.users;
		proyecto.colaboradores = angular.copy($scope.contacts);
		
	
	
		projects.create(proyecto).error(function(error){
			$scope.error = error;
			if(!$scope.error.message)
				if($scope.error.indexOf("duplicate key") != -1)
					$scope.error =
						new Object({message:"El nombre del proyecto ya esta registrado, favor de intentar con otro nombre de proyecto."});
			
			}).then(function(){
				for(i=0; i < proyecto.colaboradores.length; i++){
					
					if(proyecto.colaboradores[i].proyectos.indexOf(proyecto._id) == -1) 
						proyecto.colaboradores[i].proyectos.push(proyecto._id);
					
					auth.updateUserProjects(proyecto.colaboradores[i])
						.error(function(error){
							$scope.error = error;
							if(!$scope.error.message)
								if($scope.error.indexOf("duplicate key") != -1)
									$scope.error =
										new Object({message:"El nombre de usuario ya esta registrado, favor de intentar con otro nombre de usuario."});
						}).then(function(){
							
						});
				}
            
                alertify.delay(3000).success("Los colaboradores se actualizaron correctamente.");
			});
	};
    
    /////////////////////////////////////////////////
    
	$scope.editing = null;
	$scope.actualFile = "";
	
	var refN = new Firebase('https://muchwakun.firebaseio.com/'+$stateParams.id);
	
	//Getting the firebase object (project)
	$scope.fireProject = $firebaseArray(refN);

	$scope.updateTree = function()
	{
		$scope.fireProject = $firebaseArray(refN);
		//When the array is loaded, convert to the jsTree JSON Format 
		$scope.fireProject.$loaded().then(function(fireProject) {
		  
			$scope.treeModel = [];
			for(var i=0,j=0; i < fireProject.length; i++){
				if(fireProject[i].type == "file"){
					$scope.treeModel[j] = {};
					$scope.treeModel[j].text = fireProject[i].name;
					$scope.treeModel[j].id = fireProject[i].$id;
					$scope.treeModel[j].parent = fireProject[i].parent;
					$scope.treeModel[j].type = fireProject[i].type;
					$scope.treeModel[j].icon = "/images/file.png";
					

					j++;
				} else if(fireProject[i].type == "directory"){
					$scope.treeModel[j] = {};
					$scope.treeModel[j].text = fireProject[i].name;
					$scope.treeModel[j].id = fireProject[i].$id;
					$scope.treeModel[j].parent = fireProject[i].parent;
					$scope.treeModel[j].type = fireProject[i].type;
					$scope.treeModel[j].icon = "/images/folder.jpg";					

					j++;
				}

			}
		});
	}
	
	$scope.readyCB = function() {
       // console.log('ready event call back');
		$scope.preventNewDirectory = false;
    };
	

	$scope.changedCB = function(e, data) {
		//  console.log('changed event call back');
		$scope.actualFile = data.node.text;
        
		$scope.fileSelected = data;
        $scope.parentroot = data.node.parent;
        
		if(data.node.original.type == 'file'){
			
			$scope.actualIdDocument = data.node.id;
			$scope.changePad($scope.actualIdDocument);
			
			$scope.parentId = data.node.parent;
			$scope.preventNewDirectory = true;
			console.log("No puedes crear carpetas desde aqui");
			
		}else{//The file selected is a directory
			
			$scope.parentId = data.node.id;	
            $scope.preventNewDirectory = false;
            $scope.actualIdDocument = data.node.id;
		}
		
	};
	
	
	$scope.openNodeCB = function(e, data) {
		 // console.log('open-node event call back');	
	};
	
	$scope.addTextToProgram = function(){
		
		var opc = ["AAAAAAAAAAAAAAAAAAAAAAAA","BBBBBBBBBBBBBBBBBBBBB","CCCCCCCCCCCCCCCCCCCCCCCCC"];
		var sel = Math.floor((Math.random() * 2) + 0);
		
		$interval(function(){
			editor.insert(opc[sel]);
		},1000,5);
	}
	
	$scope.clear = function(){
		editor.setValue("");
	}
	
	$scope.saveFile = function(){
		
		if($scope.fileSelected.node.original.type == "file"){
	
		  var text = editor.getValue();
		  var name = $scope.fileSelected.node.text;
		  var type ="text/plain";
		
		  var a = document.createElement("a");
		  var file = new Blob([text], {type: type});
		  a.href = URL.createObjectURL(file);
		  a.download = name;
			a.click();

		}else{
			alertify.delay(3000).error("Opta por descargar el proyecto.");
		}
	}
	
	$scope.addTestProgram = function(){
		var py= [".py"];
		var isPy = (new RegExp('(' + py.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);

		var java = [".java"];
		var isJava = (new RegExp('(' + java.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);

		var js = [".js"];
		var isJS = (new RegExp('(' + js.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);

		var c = [".c"];
		var isC = (new RegExp('(' + c.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);

		var cpp = [".cpp"];
		var isCpp = (new RegExp('(' + cpp.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);

		if(isPy){
			editor.setValue("");
			var op = Math.floor((Math.random() * 2) + 0);
			var r = new Firebase("https://muchwakun.firebaseio.com/TestPy"+op);
			var o = $firebaseObject(r);
			
			o.$loaded()
			  .then(function(data) {
				editor.setValue(data.$value);
			  })
			  .catch(function(error) {
				console.error("Error:", error);
			  });
			
		} else if(isJava){
			editor.setValue("");
			var op = Math.floor((Math.random() * 2) + 0);
			var r = new Firebase("https://muchwakun.firebaseio.com/TestJava"+op);
			var o = $firebaseObject(r);
			
			o.$loaded()
			  .then(function(data) {
				editor.setValue(data.$value);
			  })
			  .catch(function(error) {
				console.error("Error:", error);
			  });
		} else if(isJS){
			editor.setValue("");
			var op = Math.floor((Math.random() * 2) + 0);
			var r = new Firebase("https://muchwakun.firebaseio.com/TestJS"+op);
			var o = $firebaseObject(r);
			
			o.$loaded()
			  .then(function(data) {
				editor.setValue(data.$value);
			  })
			  .catch(function(error) {
				console.error("Error:", error);
			  });
		} else if(isC){
			editor.setValue("");
			var op = Math.floor((Math.random() * 2) + 0);
			console.log(op);
			var r = new Firebase("https://muchwakun.firebaseio.com/TestC"+op);
			var o = $firebaseObject(r);
			
			o.$loaded()
			  .then(function(data) {
				editor.setValue(data.$value);
			  })
			  .catch(function(error) {
				console.error("Error:", error);
			  });
		} else if(isCpp){
			editor.setValue("");
			var op = Math.floor((Math.random() * 2) + 0);
			var r = new Firebase("https://muchwakun.firebaseio.com/TestCpp"+op);
			var o = $firebaseObject(r);
			
			o.$loaded()
			  .then(function(data) {
				editor.setValue(data.$value);
			  })
			  .catch(function(error) {
				console.error("Error:", error);
			  });
		} 	
	}

	$interval(function(){
		$scope.updateTree();
	},2000);
	
	$scope.parentId = "#";
	
	
	//// Create ACE
	var editor = ace.edit("firepad-container");
	editor.setTheme("ace/theme/monokai");
	var session = editor.getSession();
	session.setUseWrapMode(true);
	session.setUseWorker(false);
	session.setMode("ace/mode/javascript");
	
	var ref,firepad;
	
			
	$scope.changePad= function(actualId){
		
		if(firepad != null){
			firepad.dispose();
		}
		editor.setValue("");
		ref = new Firebase('https://muchwakun.firebaseio.com/'+$stateParams.id+'/'+actualId);
		firepad = Firepad.fromACE(ref, editor);
		
			
	}

	//Adding a new File
	$scope.addDocument= function(){
        
        if($scope.nameFile==undefined||$scope.nameFile=="")
        {
            alertify.delay(5000).error("Ingresa un nombre de documento.");
            return;
            
        }
        
        if($scope.validateName($scope.nameFile))
        {
            $scope.fireProject.$add({
                name : $scope.nameFile,
                type : "file",
                parent : $scope.parentId
            });
            $scope.nameFile = "";
            $scope.updateTree();
        }
        
        else{
            
            alertify.delay(5000).error("Ingresa un nombre de documento válido.");
            return;
        }
        
	}

	//Adding a new Directory
	$scope.addDirectory= function(){
        
		if($scope.nameFile==undefined||$scope.nameFile=="")
        {
            alertify.delay(5000).error("Ingresa un nombre de carpeta.");
            return;
        }
		
        if($scope.parentroot == "#" && $scope.preventNewDirectory)
        {
            
            $scope.fireProject.$add({
			name : $scope.nameFile,
			type : "directory",
			parent : $scope.parentroot
			});
			$scope.nameFile = "";
			$scope.updateTree();
            
        }
        
		else if(!$scope.preventNewDirectory){
			$scope.fireProject.$add({
			name : $scope.nameFile,
			type : "directory",
			parent : $scope.parentId
			});
			$scope.nameFile = "";
			$scope.updateTree();
		}
        
        else
        {
            alertify.delay(5000).error("No es posible generar una carpeta a partir de un archivo.");
            
        }
		
	}
	
	//Change the name file or directory
	$scope.changeName = function(){
		
		if($scope.newName==""||$scope.newName==undefined)
		{
			alertify.delay(5000).error("No ingresate ninǵun nombre.");
            return;
		}
        
        if(!$scope.preventNewDirectory)
        {
            
            var r = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id+'/'+$scope.actualIdDocument);
            var obj = $firebaseObject(r);

            obj.$loaded()
              .then(function(data) {

                console.log("data",$scope.newName); // true
                data.name = $scope.newName;
                //obj.
                data.$save().then(function(ref) {

                    console.log(r);
                    $scope.updateTree();
                    $scope.newName="";

                }, function(error) {
                  console.log("Error:", error);
                });

              })
              .catch(function(error) {
                console.error("Error:", error);
              });
    
        }
        
        else if($scope.validateName($scope.newName)){
            
            var r = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id+'/'+$scope.actualIdDocument);
            var obj = $firebaseObject(r);

            obj.$loaded()
              .then(function(data) {

                console.log("data",$scope.newName); // true
                data.name = $scope.newName;
                //obj.
                data.$save().then(function(ref) {

                    console.log(r);
                    $scope.updateTree();
                    $scope.newName="";

                }, function(error) {
                  console.log("Error:", error);
                });

              })
              .catch(function(error) {
                console.error("Error:", error);
              });
        }
        
        else{
            
            alertify.delay(5000).error("Ingresa un nombre de documento válido.");
            return;
        }
        
	}
    
    //Validate files name
    $scope.validateName = function(name){
        
        var py= [".py"];
        var isPy = (new RegExp('(' + py.join('|').replace(/\./g, '\\.') + ')$')).test(name);

        var java = [".java"];
        var isJava = (new RegExp('(' + java.join('|').replace(/\./g, '\\.') + ')$')).test(name);

        var js = [".js"];
        var isJS = (new RegExp('(' + js.join('|').replace(/\./g, '\\.') + ')$')).test(name);

        var c = [".c"];
        var isC = (new RegExp('(' + c.join('|').replace(/\./g, '\\.') + ')$')).test(name);

        var cpp = [".cpp"];
        var isCpp = (new RegExp('(' + cpp.join('|').replace(/\./g, '\\.') + ')$')).test(name);

        if(isPy){
            // Send stream and options to the server
            return true;
        } else if(isJava){
            // Send stream and options to the server
            return true;
        } else if(isJS){
            // Send stream and options to the server
            return true;
        } else if(isC){
            // Send stream and options to the server
            return true;
        } else if(isCpp){
            // Send stream and options to the server
            return true;
        } else{

            return false;
        }
            
    }
    
    //Validate editing
    $scope.isediting = function(){
        
        var r = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id);
        $scope.listediting = $firebaseArray(r);
        
        $scope.listediting.$loaded()
              .then(function(data) {
            
            for(var i=0;i<data.length;i++){
                
                if(data[i].users){
                    
                    var newr = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id+'/'+data[i].$id+'/users');
                    var users = $firebaseArray(newr);
                    
                    users.$loaded(
                      function(x) {
                        
                          for(var i=0;i<x.length;i++){
                              
                              if(x[i].cursor){
                                  alertify.delay(5000).error("Uno a más colaboradores están un documento de este proyecto.");
                              }
                          }
                          
                      }, function(error) {
                        console.error("Error:", error);
                      });
                    
                }
                   
            }
                
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
        
    }
    
    //isediting file
    $scope.iseditingfile = function(){
        
        var newr = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id+'/'+$scope.actualIdDocument+'/users');
        var users = $firebaseArray(newr);

        users.$loaded(
          function(x) {
              
            var flagf = 0;
            console.log("enter function");
            for(var i=0;i<x.length;i++){

                if(x[i].cursor){
                    alertify.delay(5000).error("Uno o más colaboradores están editando este documento.");
                    flagf++;
                }
            }

            if(flagf!=0)
            {
                $scope.editing = true;
                console.log("edirting");

            }else{

                $scope.editing = false;
                console.log("edirtingno");
            }

          }, function(error) {
            console.error("Error:", error);
          });
        
    }
    
    //Delete file or directory
    $scope.delete = function(){
        
        if(!$scope.preventNewDirectory){
            
            console.log("dir");
            
            var re = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id);
            var obj = $firebaseObject(re);
            var r = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id);
            $scope.list = $firebaseArray(r);
            var id = $scope.actualIdDocument;
            $scope.fordelete = [];
            $scope.fordelete.push($scope.actualIdDocument);
            
            console.log("list",$scope.list);
            
            obj.$loaded()
              .then(function(data) {
                
                $scope.deleterec(id,$scope.list);
                $scope.deletelist();

              })
            
        }
        
        else{
            
            $scope.iseditingfile();
            //console.log($scope.iseditingfile());
            console.log("flag",$scope.editing);
            
            if($scope.editing)
            {
                
                console.log("entraval");
                return;
                
            }
            
            else{
                
                console.log("file");

                var r = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id+'/'+$scope.actualIdDocument);
                var obj = $firebaseObject(r);

                obj.$remove().then(function(ref) {
                  // data has been deleted locally and in the database
                    $scope.updateTree();

                }, function(error) {
                  console.log("Error:", error);
                });
                
            }
            
        }
        
    }
    
    //get elements to delete
    $scope.deleterec = function(id,list){
        
        for(var i=0;i<list.length;i++){
            
            if(id==list[i].parent){

                if(list[i].type=="file"){

                    $scope.fordelete.push(list[i].$id);
                    
                } else{

                    $scope.fordelete.push(list[i].$id);
                    $scope.deleterec(list[i].$id,list);
                    
                }
            }

        }
                                    
    }
    
    //delete list of elements
    $scope.deletelist = function()
    {
        
        for(var i=0; i<$scope.fordelete.length;i++){
            
            //console.log("id= ",$scope.fordelete[i]);
            var r = new Firebase('https://muchwakun.firebaseio.com/'+$scope.project._id+'/'+$scope.fordelete[i]);
            var obj = $firebaseObject(r);

            obj.$remove().then(function(ref) {
              // data has been deleted locally and in the database

                console.log("archivo eliminado");
                

            }, function(error) {
              console.log("Error:", error);
            });
        
        }
        
        $scope.updateTree();
        
    }
	
	//Create a terminal instance
	var containers = document.getElementsByClassName('terminaljs'),
	socket = io('http://192.168.100.18:3000/pty'), term, stream;
	for(var i = 0; i < containers.length; i++) {

		setTimeout(function(i) {
			// setting tabindex makes the element focusable
			containers[i].tabindex = 0;

			// use data-* attributes to configure terminal and child_pty
			term = new Terminal(containers[i].dataset);

			// Create bidirectional stream
			stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});

			// Send stream and options to the server
			ss(socket).emit('new', stream, containers[i].dataset);

			
			if(containers[i].dataset.exec)
				{
					stream.write(containers[i].dataset.exec + "\n");	
				}

			// Connect everything up
			stream.pipe(term).dom(containers[i]).pipe(stream);
		}.bind(null, i), i*1000);
	}
	
	
	$scope.addToTerminal = function(){
		
		for(var i = 0; i < containers.length; i++) {

		setTimeout(function(i) {
			// setting tabindex makes the element focusable
			containers[i].tabindex = 0;

			// use data-* attributes to configure terminal and child_pty
			term = new Terminal(containers[i].dataset);

			// Create bidirectional stream
			stream = ss.createStream({decodeStrings: false, encoding: 'utf-8'});

			
		
			
			var py= [".py"];
			var isPy = (new RegExp('(' + py.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);
			
			var java = [".java"];
			var isJava = (new RegExp('(' + java.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);
			
			var js = [".js"];
			var isJS = (new RegExp('(' + js.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);
			
			var c = [".c"];
			var isC = (new RegExp('(' + c.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);
			
			var cpp = [".cpp"];
			var isCpp = (new RegExp('(' + cpp.join('|').replace(/\./g, '\\.') + ')$')).test($scope.actualFile);
		
			if(isPy){
				// Send stream and options to the server
				ss(socket).emit('compile', stream, {"content" : editor.getValue(), "interpreter" : "Python", "name" : "t1"});
			} else if(isJava){
				// Send stream and options to the server
				ss(socket).emit('compile', stream, {"content" : editor.getValue(), "interpreter" : "Java", "name" : "t1"});
			} else if(isJS){
				// Send stream and options to the server
				ss(socket).emit('compile', stream, {"content" : editor.getValue(), "interpreter" : "Javascript", "name" : "t1"});
			} else if(isC){
				// Send stream and options to the server
				ss(socket).emit('compile', stream, {"content" : editor.getValue(), "interpreter" : "C", "name" : "t1"});
			} else if(isCpp){
				// Send stream and options to the server
				ss(socket).emit('compile', stream, {"content" : editor.getValue(), "interpreter" : "C++", "name" : "t1"});
			} 

			if(containers[i].dataset.exec)
				{
					console.log(containers[i].dataset.exec);
					stream.write(containers[i].dataset.exec + "\n");	
				}
				
			

			// Connect everything up
			stream.pipe(term).dom(containers[i]).pipe(stream);
		}.bind(null, i), i*1000);
	}
	}

	$scope.user = auth.currentPayload();
    
    
	$scope.messages = Message.getAll($scope.project._id);
	
    //Send chat message
	$scope.send = function(newmessage)
    {
		$scope.user = auth.currentPayload();
		
        if(newmessage == undefined||newmessage.text == null)
		{
			alertify.delay(5000).error("El mensaje no puede estar vacío.");
			return;
		}
		
		console.log("new", newmessage);
		console.log("newme", newmessage.text);
        
        newmessage.user = $scope.user.username;
        newmessage.iduser = $scope.user._id;
        Message.create(newmessage);
		newmessage.text = null;
        newmessage = undefined;
        
	};

	
}]);

app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.user = {};
  if(auth.isLoggedIn()){
	  $scope.user  = auth.currentPayload();
  }
  
  if($scope.user)
		$scope.user.colaboradorIndependiente = $scope.user.nombreInstitucion == 'Colaborador Independiente';

  $scope.avatars = [
	{ url: 'Avatar1'},
	{ url: 'Avatar2'},
	{ url: 'Avatar3'},
	{ url: 'Avatar4'},
	{ url: 'Avatar5'},
	{ url: 'Avatar6'}];
  
  $scope.register = function(){
	if(!$scope.user._id) $scope.user._id = null;
	
	if($scope.user.colaboradorIndependiente) 
		$scope.user.nombreInstitucion = 'Colaborador Independiente';
	
    auth.register($scope.user).error(function(error){
		$scope.error = error;
		if(!$scope.error.message)
			if($scope.error.indexOf("duplicate key") != -1)
				$scope.error =
					new Object({message:"El nombre de usuario ya esta registrado, favor de intentar con otro nombre de usuario."});
		
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}])


app.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.currentAvatar = auth.currentAvatar;
  $scope.currentId = auth.currentId;
  $scope.logOut = auth.logOut;
}]);

app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};

    auth.saveToken = function (token){
	  $window.localStorage['flapper-news-token'] = token;
	};

	auth.getToken = function (){
	  return $window.localStorage['flapper-news-token'];
	}

	auth.isLoggedIn = function(){
	  var token = auth.getToken();

	  if(token){
		var payload = JSON.parse($window.atob(token.split('.')[1]));

		return payload.exp > Date.now() / 1000;
	  } else {
		return false;
	  }
	};

	auth.currentUser = function(){
	  if(auth.isLoggedIn()){
		var token = auth.getToken();
		var payload = JSON.parse($window.atob(token.split('.')[1]));

		return payload.username;
	  }
	};

	auth.register = function(user){
	  return $http.post('/register', user).success(function(data){
		auth.saveToken(data.token);
	  });
	};
	
	auth.updateUserProjects = function(user){
	  return $http.post('/updateUserProjects', user).success(function(data){
		console.log(data);
	  });
	};

	auth.logIn = function(user){
	  return $http.post('/login', user).success(function(data){
		auth.saveToken(data.token);
	  });
	};

	auth.logOut = function(){
	  $window.localStorage.removeItem('flapper-news-token');
	  window.location.href = "/#/login";
	};
	
	auth.currentAvatar = function(){
	  if(auth.isLoggedIn()){
		var token = auth.getToken();
		var payload = JSON.parse($window.atob(token.split('.')[1]));

		return payload.iconoAvatar;
	  }
	};
	
	auth.currentPayload = function(){
	  if(auth.isLoggedIn()){
		var token = auth.getToken();
		var payload = JSON.parse($window.atob(token.split('.')[1]));

		return payload;
	  }
	};
	
	auth.currentId = function(){
	  if(auth.isLoggedIn()){
		var token = auth.getToken();
		var payload = JSON.parse($window.atob(token.split('.')[1]));

		return payload._id;
	  }
	};
   
  return auth;
}])

app.factory('Message', ['$firebaseArray','$stateParams',
	function($firebaseArray,$stateParams) {
		
		var ref = "";
        var messages = {};
        
		
        
		var Message = {
			getAll: function(idproyecto){
				ref = new Firebase('https://muchwakun.firebaseio.com/'+idproyecto+'/messages');
				console.log(ref);
				messages = $firebaseArray(ref);
				messages.$watch(function() {
        
					console.log("data changed!");
					var objDiv = document.getElementById("foo");

					if(objDiv != null)
						objDiv.scrollTop = objDiv.scrollHeight;

				});
				
				return messages;
			},
			create: function (message) {
				messages.$add(message);
			},
			get: function (messageId) {
				return $firebaseObject(ref.child('messages').child(messageId));
			},
			delete: function (message) {
				return messages.$remove(message);
			}
		};

		return Message;

	}
	]);


app.factory('projects', ['$http', 'auth', function($http, auth){
	  var o = {
		projects: [],
		users: [],
		user: null,
		project: null
	  };
  
	o.getAll = function() {
		return $http.get('/projects',{headers: {Authorization: 'Bearer '+auth.getToken()}}).success(function(data){
		  angular.copy(data, o.projects);
		});
	};
	
	o.getAllPublic = function() {
		return $http.get('/allProjects',{headers: {Authorization: 'Bearer '+auth.getToken()}}).success(function(data){
		  angular.copy(data, o.projects);
		});
	};
	
  
	o.create = function(project) {
		return $http.post('/projects', project, {headers: {Authorization: 'Bearer '+auth.getToken()}}).success(function(data){
			o.projects.push(data);
		});
	};

	o.get = function(id) {
	  return $http.get('/projects/' + id).then(function(res){
		  	o.project = res.data;
			return res.data;
	  });
	};
	
	o.delete = function(id) {
		return $http.delete('/projects/' + id, {headers: {Authorization: 'Bearer '+auth.getToken()}}).success(function(data){
			console.log(data);
			
			var index;
			for(i=0; i<o.projects.length; i++){
				if(o.projects[i]._id == id){
					index = i;
					break;
				}
			};
			o.projects.splice(index, 1);
			
			/*if(data.ok == 1)
				alert("Proyecto eliminado correctamente.");
			else
				alert("Ocurrió un error al eliminar el proyecto.");*/
		});
	};
	
	o.getUsers = function() {
		return $http.get('/users',{headers: {Authorization: 'Bearer '+auth.getToken()}}).success(function(data){
		  for(i=0;i<data.length;i++){
			  if(data[i].iconoAvatar)
				  if( data[i].username != auth.currentUser())
					o.users.push(data[i]);
		  }
			
		  //angular.copy(data, o.users);
			for(i=0;i<o.users.length;i++){
				o.users[i].iconoAvatar = 
					"../images/" + o.users[i].iconoAvatar +".png";
			}
		  
		});
	};
	
	o.getUser = function(id) {
	  return $http.get('/users/' + id).then(function(res){
		  o.user = res.data;
			return res.data;
	  });
	};
	
	o.getProject = function(id) {
	  return $http.get('/projects/' + id).then(function(res){
		  o.project = res.data;
			return res.data;
	  });
	};
    
    o.unasignProjectToUser = function(project){
	  return $http.post('/unasignProjectToUser', project).success(function(data){
		console.log(data);
		var id=project.idProyecto;
		var index;
			for(i=0; i<o.projects.length; i++){
				if(o.projects[i]._id == id){
					index = i;
					break;
				}
			};
			o.projects.splice(index, 1);
	  });
	};
  
  return o;
}]);
// console.log("Working!");

"use strict";

(function(){
  angular
    .module("quietly.loud"[
      "ui.router"
  ])
  .config(Router)
  .controller("personalitiesIndexController", personalitiesIndexCtrl);

    Router.injector =["$stateProvider", "$locationProvider", "$urlRouterProvider"];
    function Router ($stateProvider, $locationProvider, $urlRouterProvider){
      $locationProvider.html5mode(true);
      $stateProvider
      .state("main",{
        url: "/quietly_loud",
        templateUrl:"/html/personalities-index.html",
        controller:"personalitiesIndexController",
        controllerAs:"perIndexVM"
      })
      .state("main",{
        url: "/quietlyloud",
      });
      $urlRouterProvider.otherwise("/");
    }
personalitiesFactory.$inject =["$resouce"];
  function personalitiesFactory($resource){
    var Personalities = $resource("api/product/:name");
    return Personalities
  }


personalitiesIndexCtrl.inject=["personalities"];
    function personalitiesIndexCtrl(personalities){
      var vm =this;
      vm.personailty = Personalities.query();
      vm.create = function(){
        Personalities.save(vm.newPersonalities, function(response){
          console.log(response)
        });
      };
    };
});
personalitiesIndexCtrl.inject=["$stateParams", personalities];
function personalitiesIndexCtrl($stateParams, personalities){
  var vm =this;
  vm.personalities =Personalities.get($stateParams, function(response){
      console.log(response);
      });
}

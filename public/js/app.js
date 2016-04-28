// console.log("Working!");

"use strict";

(function(){
  angular
    .module("quietlyloud"),
      "ui-router"
})
  .config(router)
  .controller("personalitiesIndexController", personalitiesIndexCtrl);

    Router.injector =["$stateProvider", "$locationProvider", "$urlRouterProvider"];
    function Router ($stateProvider, $locationProvider, $urlRouterProvider){
      $locationProvider.html5mode(true);
      $stateProvider
      .state("main",{
        url: "/",
        templateUrl:"/html/personalities-index.html",
        controller:"personalitiesIndexController",
        controllerAs:""
      })
      .state("test",{
        url: "/test",
      });
      $urlRouterProvider.otherwise("/");
    }
    function personalitiesIndexCtrl(){
      var vm =this;
      vm.name = persanilty;
    }

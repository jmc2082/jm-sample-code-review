'use strict';

angular.module('httpService', [])
  .factory('HttpService', function($http) {

    var httpFactory = {};

    // Get Stuff
    httpFactory.getRequest = function(getInfo) {
        if (getInfo.singleEndPoint) {
            var endpoint = '/api/' + getInfo.uri;
            return $http.get(endpoint);
        } else if (getInfo.paramString) {
            var endpoint = '/api/' + getInfo.uri + '/' + getInfo.param;
            return $http.get(endpoint);
        } else if (getInfo.getJson) {
            var endpoint = getInfo.uri;
            return $http.get(endpoint);
        }
    };

    // Post Stuff
    httpFactory.postRequest = function(postInfo) {
        if (postInfo.obj) {
            return $http.post('/api/' + postInfo.uri + '/', postInfo);
        } else if (postInfo.paramString) {
            var endpoint = '/api/' + postInfo.uri + '/' + postInfo.param;
            return $http.post(endpoint);
        } else if (postInfo.paramObj) {
            return $http.post('/api/' + postInfo.uri + '/' + postInfo.param + '/', postInfo);
        }
    };

    // Put/Edit Stuff
    httpFactory.putRequest = function(putInfo) {
        if (putInfo) {
            return $http.put('/api/' + putInfo.uri + '/' + putInfo.param + '/', putInfo);
        }
    };

    // Delete Stuff
    httpFactory.deleteRequest = function(deleteInfo) {
        return $http.delete('/api/' + deleteInfo.uri + '/' + deleteInfo.param);
    };

    // return our entire httpFactory object
    return httpFactory;

  });

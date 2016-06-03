"use strict";
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var app_1 = require('./app');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [
    common_1.FORM_PROVIDERS,
    router_deprecated_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    core_1.provide(angular2_jwt_1.AuthHttp, {
        useFactory: function (http) {
            return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
                tokenName: 'jwt'
            }), http);
        },
        deps: [http_1.Http]
    })
]);

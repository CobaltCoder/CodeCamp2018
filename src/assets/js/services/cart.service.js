"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var app_config_1 = require("../config/app.config");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var Rx_1 = require("rxjs/Rx");
var CartService = (function () {
    function CartService(localStorageService, http, config) {
        this.localStorageService = localStorageService;
        this.http = http;
        this.config = config;
        this.myHeaders = new http_1.Headers();
        this.opt = new http_1.RequestOptions();
        this._baseURL = this.config.get('baseURL');
        this.xforms = this.localStorageService.get("CartXForms");
        this.printxpress = this.localStorageService.get("CartPrintXpress");
        this.myHeaders.set('Content-Type', 'application/json');
        this.myHeaders.append('Accept', 'application/json');
        this.opt = new http_1.RequestOptions({
            headers: this.myHeaders
        });
        if (!this.xforms)
            this.xforms = new Array();
        if (!this.printxpress)
            this.printxpress = new Array();
    }
    CartService.prototype.ngOnInit = function () {
        if (!this.xforms)
            this.xforms = new Array();
        if (!this.printxpress)
            this.printxpress = new Array();
    };
    Object.defineProperty(CartService.prototype, "TotalCount", {
        get: function () {
            var count = 0;
            if (this.xforms)
                count += this.xforms.length;
            if (this.printxpress)
                count += this.printxpress.length;
            return count;
        },
        enumerable: true,
        configurable: true
    });
    CartService.prototype.getPX = function (id) {
        return this.printxpress.find(function (c) { return c.id === id; });
    };
    CartService.prototype.getXF = function (id) {
        return this.xforms.find(function (c) { return c.id === id; });
    };
    CartService.prototype.addtoCart = function (form, updating) {
        var className = form.classname;
        if (className === 'PrintXpress') {
            var px = form;
            this.printxpress.push(px);
        }
        if (className === 'XForm') {
            var xf = form;
            this.xforms.push(xf);
        }
        this.localStorageService.set("CartXForms", this.xforms);
        this.localStorageService.set("CartPrintXpress", this.printxpress);
    };
    CartService.prototype.removePXFromCart = function (px) {
        var index = this.printxpress.indexOf(px, 0);
        if (index > -1) {
            this.printxpress.splice(index, 1);
        }
        this.localStorageService.set("CartPrintXpress", this.printxpress);
    };
    CartService.prototype.removeXFFromCart = function (xf) {
        var index = this.xforms.indexOf(xf, 0);
        if (index > -1) {
            this.xforms.splice(index, 1);
        }
        this.localStorageService.set("CartXForms", this.xforms);
    };
    CartService.prototype.submit = function () {
        if (this.printxpress)
            this.savePxpToHoldingPen();
        if (this.xforms)
            this.submitXForms();
    };
    CartService.prototype.savePxpToHoldingPen = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.printxpress.forEach(function (element) {
            element.status = 4;
            var body = JSON.stringify(element);
            _this.http.post(_this._baseURL + 'PxpHoldingPen', body, options)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError)
                .subscribe();
        });
        this.printxpress = new Array();
        this.localStorageService.set("CartPrintXpress", this.printxpress);
    };
    CartService.prototype.savePxpToPortal = function (PXForm) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        PXForm.status = 99;
        var body = JSON.stringify(PXForm);
        this.http.post(this._baseURL + 'PxpPortalRequest', body, options)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.handleError)
            .subscribe();
        this.http.put(this._baseURL + 'PxpHoldingPen', body, options)
            .map(function (res) { return _this.extractData(res); })
            .catch(this.handleError)
            .subscribe();
        this.printxpress = new Array();
        this.localStorageService.set("CartPrintXpress", this.printxpress);
    };
    CartService.prototype.submitXForms = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.xforms.forEach(function (element) {
            var body = JSON.stringify(element);
            _this.http.post(_this._baseURL + 'XFPortalRequest', body, options)
                .map(function (res) { return _this.extractData(res); })
                .catch(_this.handleError)
                .subscribe();
        });
        this.xforms = new Array();
        this.localStorageService.set("CartXForms", this.printxpress);
    };
    CartService.prototype.createGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    CartService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    CartService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    CartService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angular_2_local_storage_1.LocalStorageService, http_1.Http, app_config_1.Config])
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;

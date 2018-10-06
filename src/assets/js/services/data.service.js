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
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var app_config_1 = require("../config/app.config");
var contact_1 = require("../core/contact");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var DataService = (function () {
    function DataService(http, config) {
        this.http = http;
        this.config = config;
        this.contacts$ = new ReplaySubject_1.ReplaySubject(1);
        this.myHeaders = new http_1.Headers();
        this.opt = new http_1.RequestOptions();
        this.myHeaders.set('Content-Type', 'application/json');
        this.myHeaders.append('Accept', 'application/json');
        this.opt = new http_1.RequestOptions({
            headers: this.myHeaders
        });
    }
    DataService_1 = DataService;
    DataService.prototype.initData = function () {
        this._baseURL = this.config.get('baseURL');
        this._currentContactURL = this.config.get('currentContactURL');
        this.currentcontact = new contact_1.Contact();
        this.getAllContacts();
        this.getFromHoldingPen();
        this.getCurrentContact();
    };
    DataService.prototype.getAllContacts2 = function (forceRefresh) {
        var _this = this;
        // If the Subject was NOT subscribed before OR if forceRefresh is requested 
        if (!this.contacts$.observers.length || forceRefresh) {
            this.http.get(this._baseURL + 'contacts').subscribe(function (data) { return _this.contacts$.next(data.json()); }, function (error) {
                _this.contacts$.error(error);
                // Recreate the Observable as after Error we cannot emit data anymore
                _this.contacts$ = new ReplaySubject_1.ReplaySubject(1);
            });
        }
        return this.contacts$;
    };
    DataService.prototype.getCurrentContact = function () {
        return this.http.get(this._currentContactURL + "getcurrentcontact")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getContactByNTID = function (ntid) {
        return this.contacts.find(function (c) { return c.ntid === ntid; });
    };
    DataService.prototype.getFromHoldingPen = function () {
        return this.http.get(this._baseURL + "PxpHoldingPen", this.opt)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getAllContacts = function () {
        var _this = this;
        this.http.get(this._baseURL + "contacts", this.opt)
            .toPromise()
            .then(function (response) { return _this.contacts = response.json(); })
            .catch(this.handleError);
        return this.contacts;
    };
    DataService.prototype.getPaperSizes = function () {
        return this.http.get(this._baseURL + "papersize")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getPaperTypes = function () {
        return this.http.get(this._baseURL + "papertype")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getPaperColors = function () {
        return this.http.get(this._baseURL + "papercolor")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getPaperCovers = function () {
        return this.http.get(this._baseURL + "papercover")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getPrintInkColors = function () {
        return this.http.get(this._baseURL + "printinkcolor")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getPrintPaperSides = function () {
        return this.http.get(this._baseURL + "printpaperside")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getFinishing = function () {
        return this.http.get(this._baseURL + "finishing")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getAdditionalRequests = function () {
        return this.http.get("assets/data/additionalrequests.json")
            .toPromise()
            .then(function (response) { return response.json().AdditionalRequests; })
            .catch(this.handleError);
    };
    DataService.prototype.getOrderTypes = function () {
        return this.http.get(this._baseURL + "XFormsOrderType")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getPress = function () {
        return this.http.get(this._baseURL + "Press")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getTimes = function () {
        return this.http.get("assets/data/times.json")
            .toPromise()
            .then(function (response) { return response.json().Times; })
            .catch(this.handleError);
    };
    DataService.prototype.getEIGs = function () {
        return this.http.get(this._baseURL + "EIG")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    DataService.prototype.createGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    DataService = DataService_1 = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpModule,
                http_1.Http
            ],
            providers: [DataService_1]
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_config_1.Config])
    ], DataService);
    return DataService;
    var DataService_1;
}());
exports.DataService = DataService;

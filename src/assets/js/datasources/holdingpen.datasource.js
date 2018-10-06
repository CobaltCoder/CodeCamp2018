"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
var HoldingPenDataSource = (function (_super) {
    __extends(HoldingPenDataSource, _super);
    function HoldingPenDataSource(_holdingpenDatabase) {
        var _this = _super.call(this) || this;
        _this._holdingpenDatabase = _holdingpenDatabase;
        _this.printxpress = new Array();
        return _this;
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    HoldingPenDataSource.prototype.connect = function () {
        return Observable_1.Observable.of(this.printxpress);
    };
    HoldingPenDataSource.prototype.disconnect = function () { };
    return HoldingPenDataSource;
}(collections_1.DataSource));
exports.HoldingPenDataSource = HoldingPenDataSource;
var HoldingPenDatabase = (function () {
    function HoldingPenDatabase(dataService) {
        this.dataService = dataService;
        /** Stream that emits whenever the data has been modified. */
        this.dataChange = new BehaviorSubject_1.BehaviorSubject([]);
        this.addUsers();
    }
    Object.defineProperty(HoldingPenDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    HoldingPenDatabase.prototype.addUsers = function () {
        this.dataChange.next(this.dataService.printXpress);
    };
    return HoldingPenDatabase;
}());
exports.HoldingPenDatabase = HoldingPenDatabase;

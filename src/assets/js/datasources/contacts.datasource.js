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
require("rxjs/add/observable/of");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var collections_1 = require("@angular/cdk/collections");
var Observable_1 = require("rxjs/Observable");
var ContactsDataSource = (function (_super) {
    __extends(ContactsDataSource, _super);
    function ContactsDataSource(_contactsDatabase, _paginator, _sort) {
        var _this = _super.call(this) || this;
        _this._contactsDatabase = _contactsDatabase;
        _this._paginator = _paginator;
        _this._sort = _sort;
        _this._filterChange = new BehaviorSubject_1.BehaviorSubject('');
        _this.filteredData = [];
        _this.renderedData = [];
        _this._filterChange.subscribe(function () { return _this._paginator.pageIndex = 0; });
        return _this;
    }
    Object.defineProperty(ContactsDataSource.prototype, "filter", {
        get: function () { return this._filterChange.value; },
        set: function (filter) { this._filterChange.next(filter); },
        enumerable: true,
        configurable: true
    });
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    ContactsDataSource.prototype.connect = function () {
        var _this = this;
        // Listen for any changes in the base data, sorting, filtering, or pagination
        var displayDataChanges = [
            this._contactsDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page,
        ];
        return Observable_1.Observable.merge.apply(Observable_1.Observable, displayDataChanges).map(function () {
            // Filter data
            _this.filteredData = _this._contactsDatabase.data.slice().filter(function (item) {
                var searchStr = (item.fullname).toLowerCase();
                return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
            });
            // Sort filtered data
            var sortedData = _this.sortData(_this.filteredData.slice());
            // Grab the page's slice of the filtered sorted data.
            var startIndex = _this._paginator.pageIndex * _this._paginator.pageSize;
            _this.renderedData = sortedData.splice(startIndex, _this._paginator.pageSize);
            return _this.renderedData;
        });
    };
    ContactsDataSource.prototype.disconnect = function () { };
    /** Returns a sorted copy of the database data. */
    ContactsDataSource.prototype.sortData = function (data) {
        var _this = this;
        if (!this._sort.active || this._sort.direction == '') {
            return data;
        }
        return data.sort(function (a, b) {
            var propertyA = '';
            var propertyB = '';
            switch (_this._sort.active) {
                case 'fullname':
                    _a = [a.fullname, b.fullname], propertyA = _a[0], propertyB = _a[1];
                    break;
                case 'email':
                    _b = [a.primaryemail, b.primaryemail], propertyA = _b[0], propertyB = _b[1];
                    break;
                case 'mailstop':
                    _c = [a.mailstop, b.mailstop], propertyA = _c[0], propertyB = _c[1];
                    break;
            }
            var valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            var valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (_this._sort.direction == 'asc' ? 1 : -1);
            var _a, _b, _c;
        });
    };
    return ContactsDataSource;
}(collections_1.DataSource));
exports.ContactsDataSource = ContactsDataSource;
var ContactsDatabase = (function () {
    function ContactsDatabase(dataService) {
        this.dataService = dataService;
        /** Stream that emits whenever the data has been modified. */
        this.dataChange = new BehaviorSubject_1.BehaviorSubject([]);
        this.addUsers();
    }
    Object.defineProperty(ContactsDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    ContactsDatabase.prototype.addUsers = function () {
        this.dataChange.next(this.dataService.contacts);
    };
    return ContactsDatabase;
}());
exports.ContactsDatabase = ContactsDatabase;

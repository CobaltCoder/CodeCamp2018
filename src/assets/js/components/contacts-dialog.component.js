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
require("rxjs/add/observable/of");
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
var core_1 = require("@angular/core");
var contacts_datasource_1 = require("../datasources/contacts.datasource");
var material_1 = require("@angular/material");
var data_service_1 = require("../services/data.service");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
var contacts;
var ContactDialogResult = (function () {
    function ContactDialogResult(dialogRef, dataService) {
        this.dialogRef = dialogRef;
        this.dataService = dataService;
        this.displayedColumns = ['fullname', 'primaryemail', 'mailstop'];
        this.contactsDatabase = new contacts_datasource_1.ContactsDatabase(this.dataService);
        this.contactControl = new forms_1.FormControl();
    }
    ContactDialogResult.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource = new contacts_datasource_1.ContactsDataSource(this.contactsDatabase, this.paginator, this.sort);
        Observable_1.Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filter.nativeElement.value;
        });
    };
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], ContactDialogResult.prototype, "filter", void 0);
    __decorate([
        core_1.ViewChild(material_1.MdSort),
        __metadata("design:type", material_1.MdSort)
    ], ContactDialogResult.prototype, "sort", void 0);
    __decorate([
        core_1.ViewChild(material_1.MdPaginator),
        __metadata("design:type", material_1.MdPaginator)
    ], ContactDialogResult.prototype, "paginator", void 0);
    ContactDialogResult = __decorate([
        core_1.Component({
            selector: 'contacts-dialog-result',
            templateUrl: 'assets/html/contacts-dialog.html'
        }),
        __metadata("design:paramtypes", [material_1.MdDialogRef, data_service_1.DataService])
    ], ContactDialogResult);
    return ContactDialogResult;
}());
exports.ContactDialogResult = ContactDialogResult;

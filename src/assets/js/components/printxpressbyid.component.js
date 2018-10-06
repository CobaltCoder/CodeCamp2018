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
var core_1 = require("@angular/core");
var printxpress_1 = require("../core/printxpress");
var data_service_1 = require("../services/data.service");
var cart_service_1 = require("../services/cart.service");
var contact_1 = require("../core/contact");
var material_1 = require("@angular/material");
var contacts_dialog_component_1 = require("./contacts-dialog.component");
var PrintXpressByIDComponent = (function () {
    function PrintXpressByIDComponent(dataService, cartService, snackBar, dialog) {
        this.dataService = dataService;
        this.cartService = cartService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.responses = ['Yes', 'No'];
        this.currentContact = new contact_1.CurrentContact();
        this.startDate = new Date();
        debugger;
        if (!this.printXpress)
            this.printXpress = new printxpress_1.PrintXpress();
        this.startDate.setDate(this.startDate.getDate() + 1);
        this.getTimes();
        this.getPaperSizes();
        this.getPaperTypes();
        this.getPaperColors();
        this.getPrintInkColors();
        this.getPrintPaperSides();
        this.getCurrCont();
        // this.printXpress.dept = currentContact.departmentname;
        // this.printXpress.email = currentContact.primaryemail;
        // this.printXpress.mailstation = currentContact.mailstop;
        // this.printXpress.name = currentContact.fullname;
        // this.printXpress.phone = currentContact.primaryphone;
        // this.printXpress.costcenter = currentContact.costcenter;
        // this.printXpress.orgcode = currentContact.orgcode;
        // this.printXpress.windowsid = currentContact.ntid;            
    }
    PrintXpressByIDComponent.prototype.openContactDialog = function (opener) {
        var _this = this;
        var dialogRef = this.dialog.open(contacts_dialog_component_1.ContactDialogResult);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                var contact = _this.dataService.getContactByNTID(result);
                switch (opener) {
                    case 'main':
                        _this.printXpress.dept = contact.departmentname;
                        _this.printXpress.email = contact.primaryemail;
                        _this.printXpress.mailstation = contact.mailstop;
                        _this.printXpress.name = contact.fullname;
                        _this.printXpress.phone = contact.primaryphone;
                        _this.printXpress.costcenter = contact.costcenter;
                        _this.printXpress.orgcode = contact.orgcode;
                        _this.printXpress.windowsid = contact.ntid;
                        break;
                    case 'cc1':
                        _this.printXpress.cc1 = contact.primaryemail;
                        break;
                    case 'cc2':
                        _this.printXpress.cc2 = contact.primaryemail;
                        break;
                    case 'cc3':
                        _this.printXpress.cc3 = contact.primaryemail;
                        break;
                    case 'cc4':
                        _this.printXpress.cc4 = contact.primaryemail;
                        break;
                    case 'delivery':
                        _this.printXpress.deliveryName = contact.fullname;
                        _this.printXpress.deliveryPhone = contact.primaryphone;
                        _this.printXpress.deliveryMailStation = contact.mailstop;
                        break;
                }
            }
        });
    };
    PrintXpressByIDComponent.prototype.getCurrCont = function () {
        var _this = this;
        this.dataService
            .getCurrentContact()
            .then(function (c) { return _this.currentContact = _this.dataService.getContactByNTID(c.name); });
    };
    PrintXpressByIDComponent.prototype.getPaperSizes = function () {
        var _this = this;
        this.dataService
            .getPaperSizes()
            .then(function (ps) { return _this.paperSizes = ps; });
    };
    PrintXpressByIDComponent.prototype.getPaperColors = function () {
        var _this = this;
        this.dataService
            .getPaperColors()
            .then(function (ps) { return _this.paperColors = ps; });
    };
    PrintXpressByIDComponent.prototype.getPaperTypes = function () {
        var _this = this;
        this.dataService
            .getPaperTypes()
            .then(function (ps) { return _this.paperTypes = ps; });
    };
    PrintXpressByIDComponent.prototype.getPrintInkColors = function () {
        var _this = this;
        var that = this;
        this.dataService
            .getPrintInkColors()
            .then(function (ps) { return _this.printInkColors = ps; });
    };
    PrintXpressByIDComponent.prototype.getPrintPaperSides = function () {
        var _this = this;
        this.dataService
            .getPrintPaperSides()
            .then(function (ps) { return _this.printPaperSides = ps; });
    };
    PrintXpressByIDComponent.prototype.getTimes = function () {
        var _this = this;
        this.dataService
            .getTimes()
            .then(function (times) { return _this.times = times; });
    };
    PrintXpressByIDComponent.prototype.addToCart = function () {
        this.cartService.addtoCart(this.printXpress);
        this.openSnackBar('Added to cart', null);
    };
    PrintXpressByIDComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    };
    __decorate([
        core_1.Input,
        __metadata("design:type", printxpress_1.PrintXpress)
    ], PrintXpressByIDComponent.prototype, "printXpress", void 0);
    PrintXpressByIDComponent = __decorate([
        core_1.Component({
            selector: 'form-detail',
            templateUrl: 'assets/html/PrintXpress.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, cart_service_1.CartService, material_1.MdSnackBar, material_1.MdDialog])
    ], PrintXpressByIDComponent);
    return PrintXpressByIDComponent;
}());
exports.PrintXpressByIDComponent = PrintXpressByIDComponent;

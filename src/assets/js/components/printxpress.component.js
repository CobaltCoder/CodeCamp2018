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
var material_1 = require("@angular/material");
var cart_service_1 = require("../services/cart.service");
var contacts_dialog_component_1 = require("./contacts-dialog.component");
var data_service_1 = require("../services/data.service");
var forms_1 = require("@angular/forms");
var printxpress_1 = require("../core/printxpress");
var snack_bar_component_1 = require("./snack-bar.component");
var snack_bar_service_1 = require("../services/snack-bar.service");
var PrintXpressComponent = (function () {
    function PrintXpressComponent(dataService, cartService, snackbarService, snackBar, dialog) {
        this.dataService = dataService;
        this.cartService = cartService;
        this.snackbarService = snackbarService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.paperSizeError = false;
        this.paperTypeError = false;
        this.paperColorError = false;
        this.printInkColorError = false;
        this.printSideError = false;
        this.active = true;
        this.submitted = false;
        this.startDate = new Date();
        this.isAdmin = false;
        this.ngs = false;
        this.empinterestgroup = false;
        this.updating = false;
        this.phonemask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.getTimes();
        this.getPaperSizes();
        this.getPaperTypes();
        this.getPaperColors();
        this.getPrintInkColors();
        this.getPrintPaperSides();
        this.getEIGs();
    }
    PrintXpressComponent.prototype.ngOnInit = function () {
        if (this.printXpress) {
            this.needbydate2 = new Date(this.printXpress.needbydate);
            this.getNGSState();
            this.getEIGState();
            this.updating = true;
        }
        if (window.location.href.startsWith('http://localhost'))
            this.isAdmin = true;
        if (!this.printXpress) {
            this.printXpress = new printxpress_1.PrintXpress();
            this.startDate.setDate(this.startDate.getDate() + 1);
            this.printXpress.needbydate = this.startDate.toDateString();
            this.needbydate2 = this.startDate;
            this.minDate = this.startDate;
            this.printXpress.needbytime = '1:00 PM';
            this.printXpress.efiles = 0;
            this.printXpress.files = '';
            this.getCurrCont();
            this.printXpress.id = this.cartService.createGuid();
        }
    };
    PrintXpressComponent.prototype.uploadComplete = function (file) {
        this.printXpress.files += file + ';';
    };
    PrintXpressComponent.prototype.getNGSState = function () {
        this.ngs = this.printXpress.ngs != null;
    };
    PrintXpressComponent.prototype.getEIGState = function () {
        this.empinterestgroup = this.printXpress.empinterestgroup != null;
    };
    PrintXpressComponent.prototype.openContactDialog = function (opener) {
        var _this = this;
        var dialogRef = this.dialog.open(contacts_dialog_component_1.ContactDialogResult);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                var contact = _this.dataService.getContactByNTID(result);
                switch (opener) {
                    case 'main':
                        _this.setCurrentContact(contact, false);
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
    PrintXpressComponent.prototype.clearContact = function (opener) {
        switch (opener) {
            case 'cc1':
                this.printXpress.cc1 = null;
                break;
            case 'cc2':
                this.printXpress.cc2 = null;
                break;
            case 'cc3':
                this.printXpress.cc3 = null;
                break;
            case 'cc4':
                this.printXpress.cc4 = null;
                break;
            case 'delivery':
                this.printXpress.deliveryName = null;
                this.printXpress.deliveryPhone = null;
                this.printXpress.deliveryMailStation = null;
                break;
        }
    };
    PrintXpressComponent.prototype.getCurrCont = function () {
        var _this = this;
        this.dataService
            .getCurrentContact()
            .then(function (cc) { return _this.setCurrentContact(cc, true); });
    };
    PrintXpressComponent.prototype.setCurrentContact = function (contact, first) {
        this.printXpress.dept = contact.departmentname;
        this.printXpress.email = contact.primaryemail;
        this.printXpress.mailstation = contact.mailstop;
        this.printXpress.name = contact.fullname;
        this.printXpress.phone = contact.primaryphone;
        this.printXpress.costcenter = contact.costcenter;
        this.printXpress.orgcode = contact.orgcode;
        this.printXpress.requestforid = contact.ntid;
        if (first) {
            this.printXpress.windowsid = contact.ntid;
            this.isAdmin = contact.isAdmin;
        }
    };
    PrintXpressComponent.prototype.onDateChange = function (event) {
        this.printXpress.needbydate = event.value;
    };
    PrintXpressComponent.prototype.getEIGs = function () {
        var _this = this;
        this.dataService
            .getEIGs()
            .then(function (eig) { return _this.EIGs = eig; });
    };
    PrintXpressComponent.prototype.onEIGSelectChange = function (event) {
        this.printXpress.empinterestgroup = event.value;
        this.printXpress.empinterestgroupdesc = event.source.selected.viewValue;
    };
    PrintXpressComponent.prototype.getPaperSizes = function () {
        var _this = this;
        this.dataService
            .getPaperSizes()
            .then(function (ps) { return _this.paperSizes = ps; });
    };
    PrintXpressComponent.prototype.getPaperColors = function () {
        var _this = this;
        this.dataService
            .getPaperColors()
            .then(function (ps) { return _this.paperColors = ps; });
    };
    PrintXpressComponent.prototype.getPaperTypes = function () {
        var _this = this;
        this.dataService
            .getPaperTypes()
            .then(function (ps) { return _this.paperTypes = ps; });
    };
    PrintXpressComponent.prototype.getPrintInkColors = function () {
        var _this = this;
        var that = this;
        this.dataService
            .getPrintInkColors()
            .then(function (ps) { return _this.printInkColors = ps; });
    };
    PrintXpressComponent.prototype.getPrintPaperSides = function () {
        var _this = this;
        this.dataService
            .getPrintPaperSides()
            .then(function (ps) { return _this.printPaperSides = ps; });
    };
    PrintXpressComponent.prototype.getTimes = function () {
        var _this = this;
        this.dataService
            .getTimes()
            .then(function (times) { return _this.times = times; });
    };
    PrintXpressComponent.prototype.addToCart = function (PXForm) {
        if (PXForm.invalid) {
            this.openSnackBar("Please address errors", "snack-error");
            this.setErrorMessages();
            return;
        }
        this.cartService.addtoCart(this.printXpress, false);
        this.printXpress = new printxpress_1.PrintXpress();
        this.openSnackBar("Added to cart", "snack-success");
        this.resetForm();
    };
    PrintXpressComponent.prototype.updateExisting = function (PXForm) {
        if (PXForm.invalid) {
            this.setErrorMessages();
            this.openSnackBar("Please address errors", "snack-error");
            return;
        }
        this.cartService.removePXFromCart(this.printXpress);
        this.cartService.addtoCart(this.printXpress, true);
        this.printXpress = new printxpress_1.PrintXpress();
        this.openSnackBar("Request updated", "snack-success");
        this.resetForm();
    };
    PrintXpressComponent.prototype.setErrorMessages = function () {
        this.paperSizeError = this.model.controls.papersize.invalid;
        this.paperTypeError = this.model.controls.papertype.invalid;
        this.paperColorError = this.model.controls.papercolor.invalid;
        this.printInkColorError = this.model.controls.printinkcolor.invalid;
        this.printSideError = this.model.controls.printside.invalid;
    };
    //reset form so errors are not displayed after adding
    PrintXpressComponent.prototype.resetForm = function () {
        var _this = this;
        this.paperSizeError = false;
        this.paperTypeError = false;
        this.paperColorError = false;
        this.printInkColorError = false;
        this.printSideError = false;
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    PrintXpressComponent.prototype.openSnackBar = function (message, cssclass) {
        this.snackbarService.cssclass = cssclass;
        this.snackbarService.message = message;
        this.snackBar.openFromComponent(snack_bar_component_1.SnackBarComponent, {
            duration: 3000,
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", printxpress_1.PrintXpress)
    ], PrintXpressComponent.prototype, "printXpress", void 0);
    __decorate([
        core_1.ViewChild('printXpressForm'),
        __metadata("design:type", forms_1.FormGroup)
    ], PrintXpressComponent.prototype, "model", void 0);
    PrintXpressComponent = __decorate([
        core_1.Component({
            selector: 'form-detail',
            templateUrl: 'assets/html/PrintXpress.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, cart_service_1.CartService, snack_bar_service_1.SnackBarService, material_1.MdSnackBar, material_1.MdDialog])
    ], PrintXpressComponent);
    return PrintXpressComponent;
}());
exports.PrintXpressComponent = PrintXpressComponent;

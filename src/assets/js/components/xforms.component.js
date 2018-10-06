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
var snack_bar_component_1 = require("./snack-bar.component");
var snack_bar_service_1 = require("../services/snack-bar.service");
var xform_1 = require("../core/xform");
var XFormsComponent = (function () {
    function XFormsComponent(dataService, cartService, snackbarService, snackBar, dialog) {
        this.dataService = dataService;
        this.cartService = cartService;
        this.snackbarService = snackbarService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.ordTypeError = false;
        this.active = true;
        this.isAdmin = false;
        this.updating = true;
        this.phonemask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.formnomask = [/[A-Za-z]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.getOrderTypes();
    }
    XFormsComponent.prototype.ngOnInit = function () {
        if (window.location.href.startsWith('http://localhost'))
            this.isAdmin = true;
        if (!this.xform) {
            this.xform = new xform_1.XForm();
            this.getCurrCont();
            this.updating = false;
            this.xform.id = this.cartService.createGuid();
        }
    };
    XFormsComponent.prototype.getCurrCont = function () {
        var _this = this;
        this.dataService
            .getCurrentContact()
            .then(function (cc) { return _this.setCurrentContact(cc, true); });
    };
    XFormsComponent.prototype.setCurrentContact = function (contact, first) {
        this.xform.ntid = contact.ntid;
        this.xform.firstName = contact.firstname;
        this.xform.lastName = contact.lastname;
        this.xform.phone = contact.primaryphone;
        this.xform.requestforntid = contact.ntid;
        this.xform.dcc = contact.costcenter;
        this.xform.deliveryContact = contact.fullname;
        this.xform.mailLocation = contact.mailstop;
        this.xform.orgCode = contact.orgcode;
        if (first) {
            this.xform.ntid = contact.ntid;
            this.isAdmin = contact.isAdmin;
        }
    };
    XFormsComponent.prototype.openContactDialog = function (opener) {
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
                        _this.xform.cc1 = contact.primaryemail;
                        break;
                    case 'cc2':
                        _this.xform.cc2 = contact.primaryemail;
                        break;
                    case 'cc3':
                        _this.xform.cc3 = contact.primaryemail;
                        break;
                    case 'cc4':
                        _this.xform.cc4 = contact.primaryemail;
                        break;
                    case 'delivery':
                        _this.xform.dcc = contact.costcenter;
                        _this.xform.deliveryContact = contact.fullname;
                        _this.xform.mailLocation = contact.mailstop;
                        _this.xform.orgCode = contact.orgcode;
                        break;
                }
            }
        });
    };
    XFormsComponent.prototype.getOrderTypes = function () {
        var _this = this;
        this.dataService
            .getOrderTypes()
            .then(function (ordTypes) { return _this.ordTypes = ordTypes; });
    };
    XFormsComponent.prototype.addToCart = function (XFForm) {
        if (XFForm.invalid) {
            this.openSnackBar("Please address errors", "snack-error");
            this.ordTypeError = this.model.controls.ordertype.invalid;
            return;
        }
        this.cartService.addtoCart(this.xform, false);
        this.xform = new xform_1.XForm();
        this.openSnackBar("Added to cart", "snack-success");
        this.resetForm();
    };
    XFormsComponent.prototype.updateExisting = function (XFForm) {
        if (XFForm.invalid) {
            this.openSnackBar("Please address errors", "snack-error");
            this.ordTypeError = XFForm.controls.ordertype.invalid;
            return;
        }
        this.cartService.removeXFFromCart(this.xform);
        this.cartService.addtoCart(this.xform, true);
        this.xform = new xform_1.XForm();
        this.openSnackBar("Request updated", "snack-success");
        this.resetForm();
    };
    //reset form so errors are not displayed after adding
    XFormsComponent.prototype.resetForm = function () {
        var _this = this;
        this.ordTypeError = false;
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    XFormsComponent.prototype.openSnackBar = function (message, cssclass) {
        this.snackbarService.cssclass = cssclass;
        this.snackbarService.message = message;
        this.snackBar.openFromComponent(snack_bar_component_1.SnackBarComponent, {
            duration: 3000,
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", xform_1.XForm)
    ], XFormsComponent.prototype, "xform", void 0);
    __decorate([
        core_1.ViewChild('XFormsForm'),
        __metadata("design:type", forms_1.FormGroup)
    ], XFormsComponent.prototype, "model", void 0);
    XFormsComponent = __decorate([
        core_1.Component({
            selector: 'form-detail',
            templateUrl: 'assets/html/XForms.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, cart_service_1.CartService, snack_bar_service_1.SnackBarService, material_1.MdSnackBar, material_1.MdDialog])
    ], XFormsComponent);
    return XFormsComponent;
}());
exports.XFormsComponent = XFormsComponent;

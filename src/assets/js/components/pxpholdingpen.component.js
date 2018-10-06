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
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var cart_service_1 = require("../services/cart.service");
var contacts_dialog_component_1 = require("./contacts-dialog.component");
var data_service_1 = require("../services/data.service");
var file_upload_service_1 = require("../services/file-upload.service");
var printxpress_1 = require("../core/printxpress");
var snack_bar_component_1 = require("./snack-bar.component");
var snack_bar_service_1 = require("../services/snack-bar.service");
var PxpHoldingPenComponent = (function () {
    function PxpHoldingPenComponent(dataService, cartService, snackBar, dialog, snackbarService, fileService) {
        this.dataService = dataService;
        this.cartService = cartService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.snackbarService = snackbarService;
        this.fileService = fileService;
        this.printXpress = new printxpress_1.PrintXpress();
        this.holdingPen4 = new Array();
        this.holdingPen99 = new Array();
        this.paperSizeError = false;
        this.paperTypeError = false;
        this.paperColorError = false;
        this.printInkColorError = false;
        this.printSideError = false;
        this.pressError = false;
        this.active = true;
        this.isAdmin = false;
        this.submitted = false;
        this.startDate = new Date();
        this.ngs = false;
        this.empinterestgroup = false;
        this.showAll = false;
        this.phonemask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.empinterestgroupint = "3";
        this.getHoldingPen();
        this.getTimes();
        this.getPaperSizes();
        this.getPaperTypes();
        this.getPaperColors();
        this.getPrintInkColors();
        this.getPrintPaperSides();
        this.getPress();
        this.getCurrCont();
        this.getEIGs();
        this.getNGSState();
        this.getEIGState();
    }
    PxpHoldingPenComponent.prototype.onEIGSelectChange = function (event) {
        this.printXpress.empinterestgroup = event.value;
        this.printXpress.empinterestgroupdesc = event.source.selected.viewValue;
    };
    PxpHoldingPenComponent.prototype.uploadComplete = function (file) {
        this.printXpress.files += file + ';';
    };
    PxpHoldingPenComponent.prototype.ngOnInit = function () {
        if (window.location.href.startsWith('http://localhost'))
            this.isAdmin = true;
    };
    PxpHoldingPenComponent.prototype.getNGSState = function () {
        this.ngs = this.printXpress.ngs != null;
    };
    PxpHoldingPenComponent.prototype.getEIGState = function () {
        this.empinterestgroup = this.printXpress.empinterestgroup > 0;
        if (this.printXpress.empinterestgroup > 0)
            this.empinterestgroupint = this.printXpress.empinterestgroup.toString(); //select only works with a string value, not number values
    };
    PxpHoldingPenComponent.prototype.getHoldingPen = function () {
        var _this = this;
        this.dataService
            .getFromHoldingPen()
            .then(function (hp) { return _this.sortHoldingPen(hp); });
    };
    PxpHoldingPenComponent.prototype.sortHoldingPen = function (data) {
        var that = this;
        data.forEach(function (obj) {
            if (obj.status === 4)
                that.holdingPen4.push(obj);
            if (obj.status === 99)
                that.holdingPen99.push(obj);
        });
        this.printXpress = this.holdingPen4[0];
        this.selectRow(0, '4');
    };
    PxpHoldingPenComponent.prototype.selectRow = function (i, hp) {
        if (hp === '4') {
            this.selectedRow4 = i;
            this.selectedRow99 = -1;
        }
        if (hp === '99') {
            this.selectedRow99 = i;
            this.selectedRow4 = -1;
        }
        this.getNGSState();
        this.getEIGState();
    };
    PxpHoldingPenComponent.prototype.getCurrCont = function () {
        var _this = this;
        this.dataService
            .getCurrentContact()
            .then(function (cc) { return _this.setCurrentContact(cc, true); });
    };
    PxpHoldingPenComponent.prototype.openContactDialog = function (opener) {
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
    PxpHoldingPenComponent.prototype.clearContact = function (opener) {
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
    PxpHoldingPenComponent.prototype.setCurrentContact = function (contact, first) {
        if (first) {
            this.isAdmin = contact.isAdmin;
        }
        else {
            this.printXpress.dept = contact.departmentname;
            this.printXpress.email = contact.primaryemail;
            this.printXpress.mailstation = contact.mailstop;
            this.printXpress.name = contact.fullname;
            this.printXpress.phone = contact.primaryphone;
            this.printXpress.costcenter = contact.costcenter;
            this.printXpress.orgcode = contact.orgcode;
            this.printXpress.windowsid = contact.ntid;
        }
    };
    PxpHoldingPenComponent.prototype.getEIGs = function () {
        var _this = this;
        this.dataService
            .getEIGs()
            .then(function (eig) { return _this.EIGs = eig; });
    };
    PxpHoldingPenComponent.prototype.getPaperSizes = function () {
        var _this = this;
        this.dataService
            .getPaperSizes()
            .then(function (ps) { return _this.paperSizes = ps; });
    };
    PxpHoldingPenComponent.prototype.getPaperColors = function () {
        var _this = this;
        this.dataService
            .getPaperColors()
            .then(function (ps) { return _this.paperColors = ps; });
    };
    PxpHoldingPenComponent.prototype.getPaperTypes = function () {
        var _this = this;
        this.dataService
            .getPaperTypes()
            .then(function (ps) { return _this.paperTypes = ps; });
    };
    PxpHoldingPenComponent.prototype.getPrintInkColors = function () {
        var _this = this;
        var that = this;
        this.dataService
            .getPrintInkColors()
            .then(function (ps) { return _this.printInkColors = ps; });
    };
    PxpHoldingPenComponent.prototype.getPrintPaperSides = function () {
        var _this = this;
        this.dataService
            .getPrintPaperSides()
            .then(function (ps) { return _this.printPaperSides = ps; });
    };
    PxpHoldingPenComponent.prototype.getTimes = function () {
        var _this = this;
        this.dataService
            .getTimes()
            .then(function (times) { return _this.times = times; });
    };
    PxpHoldingPenComponent.prototype.getPress = function () {
        var _this = this;
        this.dataService
            .getPress()
            .then(function (press) { return _this.press = press; });
    };
    PxpHoldingPenComponent.prototype.submitToAvanti = function (PXForm) {
        if (PXForm.invalid) {
            this.openSnackBar("Please address errors", "snack-error");
            this.setErrorMessages();
            return;
        }
        this.cartService.savePxpToPortal(this.printXpress);
        var idx = this.holdingPen4.indexOf(this.printXpress);
        this.holdingPen4.splice(idx, 1);
        this.holdingPen99.push(this.printXpress);
        this.printXpress = new printxpress_1.PrintXpress();
        this.openSnackBar("Request submitted", "snack-success");
        this.resetForm();
    };
    PxpHoldingPenComponent.prototype.setErrorMessages = function () {
        this.paperSizeError = this.model.controls.papersize.invalid;
        this.paperTypeError = this.model.controls.papertype.invalid;
        this.paperColorError = this.model.controls.papercolor.invalid;
        this.printInkColorError = this.model.controls.printinkcolor.invalid;
        this.printSideError = this.model.controls.printside.invalid;
        this.pressError = this.model.controls.press.invalid;
    };
    PxpHoldingPenComponent.prototype.setCurrentReq = function (PxpForm) {
        this.printXpress = PxpForm;
        this.needbydate2 = new Date(this.printXpress.needbydate);
    };
    PxpHoldingPenComponent.prototype.onDateChange = function (event) {
        this.printXpress.needbydate = event.value;
    };
    //reset form so errors are not displayed after adding
    PxpHoldingPenComponent.prototype.resetForm = function () {
        var _this = this;
        this.paperSizeError = false;
        this.paperTypeError = false;
        this.paperColorError = false;
        this.printInkColorError = false;
        this.printSideError = false;
        this.pressError = false;
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    PxpHoldingPenComponent.prototype.openSnackBar = function (message, cssclass) {
        this.snackbarService.cssclass = cssclass;
        this.snackbarService.message = message;
        this.snackBar.openFromComponent(snack_bar_component_1.SnackBarComponent, {
            duration: 3000,
        });
    };
    __decorate([
        core_1.ViewChild('PxpHoldingPenForm'),
        __metadata("design:type", forms_1.FormGroup)
    ], PxpHoldingPenComponent.prototype, "model", void 0);
    PxpHoldingPenComponent = __decorate([
        core_1.Component({
            selector: 'form-detail',
            templateUrl: 'assets/html/PxpHoldingPen.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, cart_service_1.CartService, material_1.MdSnackBar, material_1.MdDialog, snack_bar_service_1.SnackBarService, file_upload_service_1.FileService])
    ], PxpHoldingPenComponent);
    return PxpHoldingPenComponent;
}());
exports.PxpHoldingPenComponent = PxpHoldingPenComponent;

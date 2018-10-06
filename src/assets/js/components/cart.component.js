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
var data_service_1 = require("../services/data.service");
var snack_bar_component_1 = require("./snack-bar.component");
var snack_bar_service_1 = require("../services/snack-bar.service");
var CartComponent = (function () {
    function CartComponent(dataService, cartService, snackbarService, snackBar) {
        this.dataService = dataService;
        this.cartService = cartService;
        this.snackbarService = snackbarService;
        this.snackBar = snackBar;
        this.isAdmin = false;
    }
    CartComponent.prototype.ngOnInit = function () {
        this.isAdmin = this.dataService.currentcontact.isAdmin;
        if (window.location.href.startsWith('http://localhost'))
            this.isAdmin = true;
    };
    CartComponent.prototype.submit = function () {
        this.cartService.submit();
        this.openSnackBar("Requests submitted", "snack-success");
    };
    CartComponent.prototype.removePXFromCart = function (px) {
        this.cartService.removePXFromCart(px);
    };
    CartComponent.prototype.removeXFFromCart = function (xf) {
        this.cartService.removeXFFromCart(xf);
    };
    CartComponent.prototype.openSnackBar = function (message, cssclass) {
        this.snackbarService.cssclass = cssclass;
        this.snackbarService.message = message;
        this.snackBar.openFromComponent(snack_bar_component_1.SnackBarComponent, {
            duration: 3000,
        });
    };
    CartComponent = __decorate([
        core_1.Component({
            selector: 'cart-detail',
            templateUrl: 'assets/html/cart.html'
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, cart_service_1.CartService, snack_bar_service_1.SnackBarService, material_1.MdSnackBar])
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;

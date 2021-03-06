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
var snack_bar_service_1 = require("../services/snack-bar.service");
var SnackBarSuccessComponent = (function () {
    function SnackBarSuccessComponent(snackbarService) {
        this.snackbarService = snackbarService;
    }
    SnackBarSuccessComponent = __decorate([
        core_1.Component({
            selector: 'snack-bar-component-example-snack',
            templateUrl: 'assets/html/SnackBarSuccess.html'
        }),
        __metadata("design:paramtypes", [snack_bar_service_1.SnackBarService])
    ], SnackBarSuccessComponent);
    return SnackBarSuccessComponent;
}());
exports.SnackBarSuccessComponent = SnackBarSuccessComponent;

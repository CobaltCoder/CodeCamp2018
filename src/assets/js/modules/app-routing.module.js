"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var PrintXpress_component_1 = require("../components/PrintXpress.component");
var cart_component_1 = require("../components/cart.component");
var XForms_component_1 = require("../components/XForms.component");
var PxpHoldingPen_component_1 = require("../components/PxpHoldingPen.component");
var routes = [
    { path: '', redirectTo: '/PrintXpress', pathMatch: 'full' },
    { path: 'PrintXpress', component: PrintXpress_component_1.PrintXpressComponent },
    { path: 'PrintXpress/:id', component: PrintXpress_component_1.PrintXpressComponent },
    { path: 'XForms', component: XForms_component_1.XFormsComponent },
    { path: 'Cart', component: cart_component_1.CartComponent },
    { path: 'PxpHoldingPen', component: PxpHoldingPen_component_1.PxpHoldingPenComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { enableTracing: true })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

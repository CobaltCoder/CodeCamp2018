"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrintXpress_component_1 = require("../components/PrintXpress.component");
var cart_component_1 = require("../components/cart.component");
var XForms_component_1 = require("../components/XForms.component");
var PxpHoldingPen_component_1 = require("../components/PxpHoldingPen.component");
var angular_1 = require("@uirouter/angular");
var cart_service_1 = require("../services/cart.service");
exports.printXpressByIDState = {
    name: 'PrintXpressByID',
    url: '/PrintXpress/:PXId',
    component: PrintXpress_component_1.PrintXpressComponent,
    resolve: [
        {
            token: 'printXpress',
            deps: [angular_1.Transition, cart_service_1.CartService],
            resolveFn: function (trans, cartSvc) { return cartSvc.getPX(trans.params().PXId); }
        }
    ]
};
exports.xFormByIDState = {
    name: 'XFormByID',
    url: '/XForms/:XFId',
    component: XForms_component_1.XFormsComponent,
    resolve: [
        {
            token: 'xform',
            deps: [angular_1.Transition, cart_service_1.CartService],
            resolveFn: function (trans, cartSvc) { return cartSvc.getXF(trans.params().XFId); }
        }
    ]
};
exports.printXpressState = {
    name: 'PrintXpress',
    url: '/PrintXpress',
    component: PrintXpress_component_1.PrintXpressComponent,
};
exports.xFormsState = {
    name: 'XForms',
    url: '/XForms',
    component: XForms_component_1.XFormsComponent,
};
exports.cartState = {
    name: 'Cart',
    url: '/Cart',
    component: cart_component_1.CartComponent,
};
exports.pxpHoldingPenState = {
    name: 'PxpHoldingPen',
    url: '/PxpHoldingPen',
    component: PxpHoldingPen_component_1.PxpHoldingPenComponent,
};

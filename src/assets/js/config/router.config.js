"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** UIRouter Config  */
function uiRouterConfigFn(router) {
    // If no URL matches, go to the `PrintXpress` state by default
    router.urlService.rules.otherwise({ state: 'PrintXpress' });
    // StateTree.create(router, document.getElementById('statetree'), { width: 200, height: 100 });
}
exports.uiRouterConfigFn = uiRouterConfigFn;

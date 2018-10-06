"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("hammerjs");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var material_1 = require("@angular/material");
var angular_1 = require("@uirouter/angular");
var router_states_1 = require("../config/router.states");
var app_component_1 = require("../components/app.component");
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var cart_component_1 = require("../components/cart.component");
var cart_service_1 = require("../services/cart.service");
var table_1 = require("@angular/cdk/table");
var app_config_1 = require("../config/app.config");
var contacts_dialog_component_1 = require("../components/contacts-dialog.component");
var data_service_1 = require("../services/data.service");
var angular2_datatable_1 = require("angular2-datatable");
var file_upload_service_1 = require("../services/file-upload.service");
var file_upload_component_1 = require("../components/file-upload.component");
var filterBy_pipe_1 = require("../pipes/filterBy.pipe");
var http_1 = require("@angular/http");
var ngx_popover_1 = require("ngx-popover");
var PrintXpress_component_1 = require("../components/PrintXpress.component");
var PxpHoldingPen_component_1 = require("../components/PxpHoldingPen.component");
var snack_bar_component_1 = require("../components/snack-bar.component");
var snack_bar_service_1 = require("../services/snack-bar.service");
var angular2_text_mask_1 = require("angular2-text-mask");
var XForms_component_1 = require("../components/XForms.component");
var router_config_1 = require("../config/router.config");
var INITIAL_STATES = [router_states_1.printXpressState, router_states_1.xFormsState, router_states_1.cartState, router_states_1.printXpressByIDState, router_states_1.xFormByIDState, router_states_1.pxpHoldingPenState];
var INITIAL_COMPONENTS = [PrintXpress_component_1.PrintXpressComponent, XForms_component_1.XFormsComponent, cart_component_1.CartComponent, PxpHoldingPen_component_1.PxpHoldingPenComponent, app_component_1.AppComponent, snack_bar_component_1.SnackBarComponent, contacts_dialog_component_1.ContactDialogResult];
function initConfig(config) {
    return function () { return config.load(); };
}
exports.initConfig = initConfig;
//  export function init(config: AppConfig) {
//   return () => {
//     return config.load(); // add return
//   };
// }
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                ngx_popover_1.PopoverModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                material_1.MdAutocompleteModule,
                material_1.MdButtonModule,
                material_1.MdButtonToggleModule,
                material_1.MdCardModule,
                material_1.MdCheckboxModule,
                material_1.MdChipsModule,
                material_1.MdDatepickerModule,
                material_1.MdDialogModule,
                material_1.MdExpansionModule,
                material_1.MdGridListModule,
                material_1.MdIconModule,
                material_1.MdInputModule,
                material_1.MdListModule,
                material_1.MdMenuModule,
                material_1.MdNativeDateModule,
                material_1.MdPaginatorModule,
                material_1.MdProgressBarModule,
                material_1.MdProgressSpinnerModule,
                material_1.MdRadioModule,
                material_1.MdRippleModule,
                material_1.MdSelectModule,
                material_1.MdSidenavModule,
                material_1.MdSliderModule,
                material_1.MdSlideToggleModule,
                material_1.MdSnackBarModule,
                material_1.MdSortModule,
                material_1.MdTableModule,
                material_1.MdTabsModule,
                material_1.MdToolbarModule,
                material_1.MdTooltipModule,
                http_1.HttpModule,
                table_1.CdkTableModule,
                app_component_1.AppComponent,
                angular2_datatable_1.DataTableModule,
                angular2_text_mask_1.TextMaskModule,
                angular_1.UIRouterModule.forRoot({
                    states: INITIAL_STATES,
                    useHash: true,
                    config: router_config_1.uiRouterConfigFn
                }),
                angular_2_local_storage_1.LocalStorageModule.withConfig({
                    prefix: 'CreateV2',
                    storageType: 'localStorage'
                })
            ],
            declarations: [
                INITIAL_COMPONENTS,
                filterBy_pipe_1.FilterPipe,
                file_upload_component_1.FileUploadComponent
            ],
            entryComponents: [
                contacts_dialog_component_1.ContactDialogResult
            ],
            providers: [
                data_service_1.DataService,
                cart_service_1.CartService,
                snack_bar_service_1.SnackBarService,
                angular_2_local_storage_1.LocalStorageService,
                file_upload_service_1.FileService,
                app_config_1.Config,
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: initConfig,
                    deps: [app_config_1.Config, http_1.HttpModule],
                    multi: true
                }
            ],
            bootstrap: [app_component_1.AppComponent, snack_bar_component_1.SnackBarComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

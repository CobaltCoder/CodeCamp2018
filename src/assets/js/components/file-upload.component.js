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
var file_upload_service_1 = require("../services/file-upload.service");
var FileUploadComponent = (function () {
    function FileUploadComponent(fileService) {
        this.fileService = fileService;
        this.errors = new Array();
        this.filesUploaded = new Array();
        this.dragAreaClass = 'dragarea';
        this.fileExt = "*";
        this.maxSize = 50; // 50MB
        this.uploadStatus = new core_1.EventEmitter();
    }
    FileUploadComponent.prototype.ngOnInit = function () { };
    FileUploadComponent.prototype.onFileChange = function (event) {
        var files = event.target.files;
        this.saveFiles(files);
    };
    FileUploadComponent.prototype.onDragOver = function (event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    };
    FileUploadComponent.prototype.onDragEnter = function (event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    };
    FileUploadComponent.prototype.onDragEnd = function (event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    };
    FileUploadComponent.prototype.onDragLeave = function (event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    };
    FileUploadComponent.prototype.onDrop = function (event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
        event.stopPropagation();
        var files = event.dataTransfer.files;
        this.saveFiles(files);
    };
    FileUploadComponent.prototype.saveFiles = function (files) {
        var _this = this;
        this.errors = []; // Clear error
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
            return;
        }
        if (files.length > 0) {
            var formData = new FormData();
            for (var j = 0; j < files.length; j++) {
                formData.append("file[]", files[j], files[j].name);
            }
            var parameters = {
                id: this.pxid
            };
            this.fileService.upload(formData, parameters)
                .subscribe(function (success) {
                _this.uploadStatus.emit(success[0].Path);
                _this.filesUploaded.push(success[0].Path);
                console.log(success);
            }, function (error) {
                _this.uploadStatus.emit(false);
                _this.errors.push(error.ExceptionMessage);
            });
        }
    };
    FileUploadComponent.prototype.isValidFiles = function (files) {
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    };
    FileUploadComponent.prototype.isValidFileExtension = function (files) {
        // Make array of file extensions
        var extensions = (this.fileExt.split(','))
            .map(function (x) { return x.toLocaleUpperCase().trim(); });
        for (var i = 0; i < files.length; i++) {
            // Get file extension
            var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            var exists = extensions.includes(ext) || extensions.includes('*');
            if (!exists) {
                this.errors.push("Error (Extension): " + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    };
    FileUploadComponent.prototype.isValidFileSize = function (file) {
        var fileSizeinMB = file.size / (1024 * 1000);
        var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize)
            this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileUploadComponent.prototype, "pxid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileUploadComponent.prototype, "fileExt", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FileUploadComponent.prototype, "maxSize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "uploadStatus", void 0);
    __decorate([
        core_1.HostListener('dragover', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDragOver", null);
    __decorate([
        core_1.HostListener('dragenter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDragEnter", null);
    __decorate([
        core_1.HostListener('dragend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDragEnd", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDragLeave", null);
    __decorate([
        core_1.HostListener('drop', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FileUploadComponent.prototype, "onDrop", null);
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'file-upload',
            templateUrl: 'assets/html/file-upload.html'
        }),
        __metadata("design:paramtypes", [file_upload_service_1.FileService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;

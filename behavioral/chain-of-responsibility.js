/**
 * A chain of responsibility in software development is a design pattern that allows dynamic processing of objects.
 * Instead of using a series of if ... elif ... else statements,
 * you can use a linked-list structure to pass data along to the next processing object in the chain. With this design,
 * each object in the chain can perform it's own checks on the data, or even modify it before sending data along to the next object in the chain.
 */
// 1) Abstract handler
// 2) Concrete handlers
// 3) Concrete handler should return next handler in a chain
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PublicApiValidation = /** @class */ (function () {
    function PublicApiValidation() {
    }
    PublicApiValidation.prototype.setNext = function (next) {
        this.next = next;
    };
    PublicApiValidation.prototype.validateRequest = function (request) {
        this.checkRequest(request);
        if (this.next) {
            this.next.validateRequest(request);
        }
    };
    return PublicApiValidation;
}());
var CheckRole = /** @class */ (function (_super) {
    __extends(CheckRole, _super);
    function CheckRole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckRole.prototype.checkRequest = function (request) {
        var allowedRoles = ['admin', 'paid-user'];
        if (allowedRoles.includes(request.role)) {
            return true;
        }
        else {
            throw new Error("".concat(request.role, " role is not allowed for the request, only ").concat(allowedRoles.join(', ')));
        }
    };
    return CheckRole;
}(PublicApiValidation));
var CheckUrl = /** @class */ (function (_super) {
    __extends(CheckUrl, _super);
    function CheckUrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckUrl.prototype.checkRequest = function (request) {
        if (request.url.startsWith('https')) {
            return true;
        }
        else {
            throw new Error("".concat(request.url, " url with http method is not allowed for the request"));
        }
    };
    return CheckUrl;
}(PublicApiValidation));
var CheckMethod = /** @class */ (function (_super) {
    __extends(CheckMethod, _super);
    function CheckMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckMethod.prototype.checkRequest = function (request) {
        var validMethods = ['get', 'post'];
        if (validMethods.includes(request.method)) {
            return true;
        }
        else {
            throw new Error("The ".concat(request.method, " method is not allowed for the request, only ").concat(validMethods.join(', ')));
        }
    };
    return CheckMethod;
}(PublicApiValidation));
var BestApi = /** @class */ (function () {
    function BestApi() {
    }
    BestApi.prototype.makeRequest = function (request) {
        var checkRole = new CheckRole();
        var checkUrl = new CheckUrl();
        var checkMethod = new CheckMethod();
        // Chain of responsibility
        checkRole.setNext(checkUrl);
        checkUrl.setNext(checkMethod);
        checkRole.validateRequest(request);
        setTimeout(function () {
            var response = JSON.stringify({ id: 1, entity: 'story', value: 'Opqowe' });
            console.log("Response from the ".concat(request.url, ": ").concat(response));
        }, 1000);
    };
    return BestApi;
}());
var api = new BestApi();
api.makeRequest({ url: 'https://qwe.com', method: 'post', role: 'admin' });

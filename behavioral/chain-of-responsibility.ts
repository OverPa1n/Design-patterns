/**
 * A chain of responsibility in software development is a design pattern that allows dynamic processing of objects.
 * Instead of using a series of if ... elif ... else statements,
 * you can use a linked-list structure to pass data along to the next processing object in the chain. With this design,
 * each object in the chain can perform it's own checks on the data, or even modify it before sending data along to the next object in the chain.
 */
// 1) Abstract handler
// 2) Concrete handlers
// 3) Concrete handler should return next handler in a chain

interface RequestInterface {url: string; role: string; method: string}

abstract class PublicApiValidation {
    next!: PublicApiValidation;

    setNext(next: PublicApiValidation) {
        this.next = next;
    }

    validateRequest(request: RequestInterface) {
        this.checkRequest(request);

        if (this.next) {
            this.next.validateRequest(request);
        }
    }

    protected abstract checkRequest(request: RequestInterface): boolean;
}

class CheckRole extends PublicApiValidation {
    protected checkRequest(request: RequestInterface): boolean | any {
        const allowedRoles = ['admin', 'paid-user'];

        if (allowedRoles.includes(request.role)) {
            return true;
        } else {
            throw new Error(`${request.role} role is not allowed for the request, only ${allowedRoles.join(', ')}`);
        }
    }
}

class CheckUrl extends PublicApiValidation {
    protected checkRequest(request: RequestInterface): boolean | any {

        if (request.url.startsWith('https')) {
            return true;
        } else {
            throw new Error(`${request.url} url with http method is not allowed for the request`);
        }
    }
}

class CheckMethod extends PublicApiValidation {
    protected checkRequest(request: RequestInterface): boolean | any {
        const validMethods = ['get', 'post'];

        if (validMethods.includes(request.method)) {
            return true;
        } else {
            throw new Error(`The ${request.method} method is not allowed for the request, only ${validMethods.join(', ')}`);
        }
    }
}

class BestApi {
    makeRequest(request: RequestInterface) {
        const checkRole = new CheckRole();
        const checkUrl = new CheckUrl();
        const checkMethod = new CheckMethod();
        // Chain of responsibility
        checkRole.setNext(checkUrl);
        checkUrl.setNext(checkMethod);
        checkRole.validateRequest(request);

        setTimeout(() => {
            const response = JSON.stringify({id: 1, entity: 'story', value: 'Opqowe'});

            console.log(`Response from the ${request.url}: ${response}`);
        }, 1000)
    }
}

const api = new BestApi();

api.makeRequest({url: 'https://qwe.com', method: 'post', role: 'admin'});

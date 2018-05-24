import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor() {
    }
    /**
     * @param {any} error
     * @memberof GlobalErrorHandler
     */
    handleError(error) {
        try {
            // console.group('ErrorHandler');
            // console.error(error.message);
            // console.error(error.stack);
            // console.groupEnd();
        } catch (handlingError) {

            console.group('ErrorHandler');
            console.warn('Error when trying to output error.');
            console.error(handlingError);
            console.groupEnd();

        }
        // return false;
        throw (error);
    }
}

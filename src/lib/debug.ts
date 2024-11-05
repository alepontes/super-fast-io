import {tap} from "rxjs";


/**
 * Realiza um log direto ou por função
 * Um console.log que funciona em um pipe de RxJS
 * @param fn
 */
export const debug: any = (fn?: (message: any) => string) => tap(message => {
    if (fn instanceof Function) {
        console.log(fn(message))
    } else {
        console.log(message);
    }
})

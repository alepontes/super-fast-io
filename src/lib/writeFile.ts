import {concatMap, Observable} from "rxjs";
import {writeFile as writeFileFn} from "node:fs";

/**
 * Escreve o conteudo de um pipe em um arquivo
 * @param output
 */
export const writeFile = (output: string) => concatMap(message => {
    return new Observable(observer => {
        writeFileFn(output, JSON.stringify(message, null, 2), 'utf-8', (err) => {
            if (err) {
                observer.error(err)
            } else {
                observer.complete();
            }
        })
    })
})
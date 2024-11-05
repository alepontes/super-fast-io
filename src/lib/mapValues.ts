import {IContract} from "../Interfaces/IContract";
import {concatMap, from, map, reduce} from "rxjs";
import {EntryKey} from "../Interfaces/EntryKey";

/**
 * Corre todos os values em aplica uma função atualizando o objeto original em um pipe
 * @param keys
 * @param fn
 */
export const mapValues: any = (keys: Array<EntryKey>, fn: (value: string) => any) => concatMap((contract: any) => {
    return from(keys).pipe<any>(
        map((key: EntryKey) => {
            return {
                [key]: fn(contract[key]),
            }
        }),
        // @ts-ignore
        reduce((obj, item) => {
            return {
                ...obj,
                ...item,
            }
        }),
        map((newObj: any) => {
            return {
                ...contract,
                ...newObj,
            }
        })
    )
})


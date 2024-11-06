import {mapValues} from "./mapValues";
import {EntryKey} from "../Interfaces/EntryKey";

/**
 * Valida CPF
 * @param stg
 */
const cpf = (stg: string) => {

    if (!stg || stg.length !== 11) {
        return false;
    }

    const sum = (digits: string, base: number) => {
        const soma = digits
            .split('')
            .map(digit => Number(digit))
            .reduce((total, digit, i) => {
                return total + (digit * (base - i));
            }, 0);

        const rest = soma % 11;

        if (rest <= 1) {
            return 0;
        }

        if (rest >= 2) {
            return 11 - rest;
        }

    }

    // remove não numeros
    const cpf = stg.replace(/\D/g, '')

    // divide string
    const [, base, v] = cpf.match(/^(\d{9})(\d{2})$/) || [];

    // atribui resultados
    const r1 = Number(v[0]);
    const r2 = Number(v[1]);

    // recupera resultados
    const n1 = sum(base, 10);
    const n2 = sum(base + n1, 11);

    return n1 === r1 && n2 === r2;
}


/**
 *
 * @param stg
 */
const cnpj = (stg: string) => {

    const weight1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weight2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const sum = (base: string, w: number[]) => {

        let total = 0;

        const digits = base.split('');

        for (let i = 0; i < digits.length; i++) {
            total += Number(digits[i]) * w[i];
        }

        const rest = total % 11;

        if (rest <= 1) {
            return 0;
        }

        if (rest >= 2) {
            return 11 - rest;
        }

    }

    if (!stg || stg.length !== 14) {
        return false;
    }

    // remove não numeros
    const cnpj = stg.replace(/\D/g, '');

    // divide string
    const [, base, v] = cnpj.match(/^(\d{12})(\d{2})$/) || [];

    // atribui resultados
    const r1 = Number(v[0]);
    const r2 = Number(v[1]);

    // recupera resultados
    const n1 = sum(base, weight1);
    const n2 = sum(base + n1, weight2);

    return n1 === r1 && n2 === r2;
}


export const validateDocumentFn = (value: string): boolean => {
    const doc = value?.replace(/\D/g, '').trim();

    if (doc.length === 11) {
        return cpf(doc);
    }

    if (doc.length === 14) {
        return cnpj(doc);
    }

    return false;
}

/**
 * Valida um documento (CPF ou CNPJ)
 * @param keys
 */
export const validateDocument = (keys: Array<EntryKey>) => mapValues(keys, validateDocumentFn);


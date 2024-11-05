import {mapValues} from "./mapValues";
import {EntryKey} from "../Interfaces/EntryKey";

/**
 * Converte um string de number para a string em formato BRL (R$)
 * @param keys
 */
export const stringToBRL = (keys: Array<EntryKey>) => mapValues(keys, (stg: string) => {

    // converte string para number
    const value: number = parseFloat(stg.trim());

    // remove valores vazios ou inválidos
    if (!value || isNaN(value)) {
        return 'R$ 0,00';
    }

    return Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(value)
})
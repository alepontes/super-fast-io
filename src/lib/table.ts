import {tap} from "rxjs";
import {IContract} from "../Interfaces/IContract";
import {stringToFloat} from "./stringToFloat";
import {formatDocumentFn} from "./formatDocument";
import {stringToBRLFn} from "./stringToBRL";

/**
 * Imprime valores tabulados
 */
export const table = () => tap((contracts: Array<IContract>) => {

    const contract: IContract = contracts[0];

    // remove contratos vazios
    if (!contracts.length || !contract) {
        return
    }

    // recupera quantidade de prestações
    const qtPrestacoes = +contract?.qtPrestacoes;

    const vlTotal = stringToFloat(contract?.vlTotal);

    const vlPresta = stringToBRLFn(contract.vlPresta);

    // valor médio das parcelas
    const averageInstallmentValue = vlTotal / qtPrestacoes;

    const table = {
        // código do cliente
        "Codigo Cliente": contract.cdClient,

        // nome do cliente
        "Nome Cliente": contract.nmClient,

        // numero de documento (CPF/CNPJ)
        "Documento": formatDocumentFn(contract.nrCpfCnpj || ""),

        // numero do contrato
        "Numero do Contrato": contract.nrContrato,

        // quantidade de prestações do contrato
        "Prestacoes definidas": qtPrestacoes,

        // quantidade de prestações encontradas no contrato
        "Prestacoes encontradas": contracts.length,

        // valor total definido no contrato
        "vlPresta": vlPresta,

        'vlTotal / qtPrestacoes': stringToBRLFn(averageInstallmentValue),
    }

    console.table(table);
});


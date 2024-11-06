import {from, fromEvent, groupBy, mergeMap, takeUntil, toArray} from "rxjs";
import {createReadStream} from "fs";
import csvParser from "csv-parser";
import {writeFile} from "./lib/writeFile";
import {table} from "./lib/table";
import {stringToBRL} from "./lib/stringToBRL";
import {debug} from "./lib/debug";
import path from "node:path";

// recupera o path do arquivo de entrada
const inputFilePath = path.resolve(__dirname, '../../data.csv');

// define arquivo de saida em formato JSON
const outputFilePath = path.resolve(__dirname, '../../data-output.json');

// cria stream de leitura do arquivo
const $readFile = createReadStream(inputFilePath).pipe(csvParser());

// inicia um stream a partir do evento `data`
fromEvent($readFile, 'data')
    .pipe(
        // finaliza observable ao finalizar leitura do arquivo
        takeUntil(fromEvent($readFile, 'end')),
    ).pipe(
    // agrupa os observables pelo número de contrato
    groupBy((message: any) => message.nrContrato),

    // roda todos os itens(agrupados por número de contrato) simultaneamente
    mergeMap(group$ => group$.pipe(
        // valida CNPJ
        // filter((contract: IContract) => validateDocumentFn(contract.nrCpfCnpj)),

        toArray(),

        // imprime o resumo do contrato (não altera a stream)
        table(),

        // ajustar os valores simultaneamente para todos os registros ao mesmo tempo
        mergeMap((message: any) => from(message).pipe(
            // transforma os dados correspondentes as chaves do array de string no formato BRL
            stringToBRL([
                "vlTotal",
                "vlPresta",
                "vlMora",
                "vlMulta",
                "vlOutAcr",
                "vlIof",
                "vlDescon",
                "vlAtual"
            ]),
        ))
    )),
    toArray(),

    debug((message: any) => `${message.length} parcelas processadas a partir do arquivo ${inputFilePath}`),

    // escreve resultado em um arquivo
    writeFile(outputFilePath),
).subscribe();

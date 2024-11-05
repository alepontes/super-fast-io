import {fromEvent, groupBy, mergeMap, takeUntil, toArray} from "rxjs";
import {createReadStream} from "fs";
import csvParser from "csv-parser";
import {stringToBRL} from "./lib/stringToBRL";
import {debug} from "./lib/debug";
import {writeFile} from "./lib/writeFile";

// const input = `/home/ale/Archive/Develop/super-fast-io/playground/data.csv`;
const input = `/home/ale/Archive/Develop/super-fast-io/data.csv`;
const output = `/home/ale/Archive/Develop/super-fast-io/playground/data-output.json`;
// const output = `/home/ale/Archive/Develop/super-fast-io/data.csv`;

const $readFile = createReadStream(input).pipe(csvParser());

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
        // validateCNPJ(['nrCpfCnpj']),

        // converte os campos para BRL
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

        toArray(),
    )),
    toArray(),

    // escreve resultado em um arquivo
    writeFile(output),

    debug(),
).subscribe();

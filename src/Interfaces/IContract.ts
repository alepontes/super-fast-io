export interface IEntry {
    /** Número da instituição financeira */
    nrInst: string;

    /** Número da agência bancária */
    nrAgencia: string;

    /** Código do cliente */
    cdClient: string;

    /** Nome do cliente */
    nmClient: string;

    /** Número do CPF/CNPJ do cliente */
    nrCpfCnpj: string;

    /** Número do contrato */
    nrContrato: string;

    /** Data de início do contrato no formato YYYYMMDD */
    dtContrato: string;

    /** Quantidade total de prestações no contrato */
    qtPrestacoes: string;

    /** Valor total do contrato */
    vlTotal: string;

    /** Código do produto relacionado ao contrato */
    cdProduto: string;

    /** Descrição do produto */
    dsProduto: string;

    /** Código da carteira de crédito */
    cdCarteira: string;

    /** Descrição da carteira de crédito */
    dsCarteira: string;

    /** Número da proposta */
    nrProposta: string;

    /** Número da prestação atual */
    nrPresta: string;

    /** Tipo de prestação */
    tpPresta: string;

    /** Número de sequência da prestação */
    nrSeqPre: string;

    /** Data de vencimento da prestação no formato YYYYMMDD */
    dtVctPre: string;

    /** Valor da prestação */
    vlPresta: string;

    /** Valor de mora */
    vlMora: string;

    /** Valor de multa */
    vlMulta: string;

    /** Valor de outros acréscimos */
    vlOutAcr: string;

    /** Valor do IOF */
    vlIof: string;

    /** Valor de desconto */
    vlDescon: string;

    /** Valor atual do contrato */
    vlAtual: string;

    /** Situação atual do contrato */
    idSituac: string;

    /** Situação de vencimento do contrato */
    idSitVen: string;
}

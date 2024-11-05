
const cnpj = (document: string) => {
    return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

const cfp = (document: string) => {
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata o documento (CPF ou CNPJ)
 * @param document
 */
export const formatDocumentFn = (document: string) => {
    const doc = (document || "")?.replace(/\D/g, '').trim();

    if (doc.length === 11) {
        return cfp(doc);
    }

    if (doc.length === 14) {
        return cnpj(doc);
    }

    return doc;
}
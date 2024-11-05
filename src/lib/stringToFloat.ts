
/**
 * Converte
 * @param stg
 */
export const stringToFloat = (stg: string) => {
    const value = stg
        .replace(/\./g, '')
        .replace(',', '.');

    return parseFloat(value);
}

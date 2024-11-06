
/**
 * Converte
 * @param stg
 */
export const stringToFloat = (stg: string) => {
    const value = stg
        .trim()
        .replace(/\./g, '')
        .replace(',', '.');

    return parseFloat(value);
}

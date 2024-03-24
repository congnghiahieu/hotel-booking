/**
 *
 * @param {string} str string
 * @returns {string} new string after remove unnecessary white spaces
 */
const rmWs = str => {
    if (str === null || str === undefined || str === '') return '';
    return str.replace(/\s+/g, ' ').trim();
};

/**
 *
 * @param {string} str Vietnamese string with accents like (á, ạ, â, ơ, ớ, đ, Đ,...)
 * @returns {string} string after remove all Vietnamese accents
 */
const rmVnAccents = str => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};

/**
 *
 * @param {string} str string to be removed all VN accents and lower case
 * @returns {string} new string in lowercase and no VN accents
 */
const normalizeStr = str => {
    return rmVnAccents(str).toLowerCase().trim();
};

/**
 *
 * @param {string} str string to get search value
 * @returns {Array<RegExp>}
 */
const getSearchRegex = str => {
    const wsPad = '\\s*';
    const parts = str.split(' ');
    let searchValue = wsPad;
    for (let part of parts) {
        searchValue += part + wsPad;
    }
    const accentRegex = new RegExp(searchValue, 'i');
    const noAccentRegex = new RegExp(normalizeStr(searchValue), 'i');
    return [accentRegex, noAccentRegex];
};

module.exports = {
    rmWs,
    rmVnAccents,
    normalizeStr,
    getSearchRegex,
};

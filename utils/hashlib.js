const { createHash } = require('crypto');

const sha256HashGen = (data, digestType = 'hex', encoding = 'utf-8') => {
    if (!data) return;
    return createHash('sha256').update(data, encoding).digest(digestType);
};

const sha256HashCheck = (data, orginalHash, digestType = 'hex', encoding = 'utf-8') => {
    if (!data) return;
    if (!orginalHash) return;
    let hash = createHash('sha256').update(data, encoding).digest(digestType);
    return (orginalHash === hash);
};

module.exports = {
    sha256HashGen,
    sha256HashCheck
};
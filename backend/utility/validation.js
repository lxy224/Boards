const validation = {};

validation.generateCode = () => {
    let ret = '';

    for(let i = 0; i < 6; ++ i) {
        ret += Math.floor(Math.random() * 9) + 1; // Let it from 1 to 9
    }

    return ret;
};

module.exports = validation;

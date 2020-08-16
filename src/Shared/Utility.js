export const checkValidity = (value, rules) =>{
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isName) {
        const pattern = /^[A-Za-z ]*$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isPhnNo) {
        const pattern = /[0][1][3456789]+(?:[0-9]*)$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid
}
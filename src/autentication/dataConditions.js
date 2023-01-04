import {validEmail, validName, validPassword} from "./Regex";

export function helperTextName(stringName) {
    if (stringName.trim().length===0) return 'Nome vazio!'
    if (stringName.replace(validName, '').length>0) return 'O nome só pode conter letras ou dígitos!';
    return null;
}

export function helperTextEmail(stringEmail) {
    if (stringEmail.trim().length===0) return 'Email vazio!'
    if (stringEmail.replace(validEmail, '').length>0) return 'O email não é válido!';
    return null;
}

export function helperTextPassword(stringPassword) {
    if (stringPassword.trim().length===0) return 'Password vazio!'
    if (stringPassword.replace(validPassword, '').length>0) return 'A password tem de ter pelo menos ' +
        '1 letra maiúscula, ' +
        'letra minúscula, ' +
        'dígito e ' +
        'caracter especial (@$!%*?&_#+()-)!';
    if ((stringPassword.trim().length<8 || stringPassword.trim().length>30) && stringPassword.trim().length!==0) return 'A password deve estar entre 8 a 30 caracteres!';
    return null;
}

export function helperTextConfirmPassword(stringConfirmPassword, stringPassword) {
    if (stringConfirmPassword.trim().length===0) return 'Confirmar password vazio!'
    if (stringConfirmPassword.trim() !== stringPassword.trim() && stringConfirmPassword.trim().length>0) return 'Passwords devem corresponder!';
    return null;
}

export function helperTextEmailLogin(stringEmail) {
    if (stringEmail.trim().length===0) return 'Email vazio!'
    return null;
}
export function helperTextPasswordLogin(stringPassword) {
    if (stringPassword.trim().length===0) return 'Password vazio!'
    return null;
}
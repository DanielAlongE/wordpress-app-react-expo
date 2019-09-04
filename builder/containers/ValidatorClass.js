export default class Validator {
    constructor(){

    }

    static isString(value){
        return typeof value === "string" || value instanceof String;
    }

    static isArray(value){
        return Array.isArray(value);
    }

    static isNumber(value){
        return /^\d+(\.)?\d*$/.test(value);
    }

    static isInteger(value){
        return /^[0-9]+$/.test(value);
    }

    static isdecimal(value){
        return /^\d+(\.){1}\d*$/.test(value);
    }

    static isUrl(value){
        return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ig.test(value);
    }

    static isEmail(value){
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/ig.test(value);
    }

    static minLength(value, min=1){
        return value.length >= min;
    }

    static maxLength(value, max=1){
        return value.length <= max;
    }

    static exactLength(value, exact=1){
        return value.length === exact;
    }

    static isEmpty(value){
    
        if(Validator.isArray(value)){
                return value.length === 0;
        }else{
            return value === "";
        }
    }

    static check(value){

        const {isArray, isInteger, isdecimal, isNumber, isEmail, isUrl, isString} = Validator;

        let checks = [
            {isArray},
            {isdecimal},
            {isInteger},
            {isNumber},
            {isEmail},
            {isUrl},
            {isString}
        ]

/*        for(let i=0; i<checks.length; i++){
            let [[type, call]] = Object.entries(checks[i]);
            if(call(value)){
                console.log(value, type);
                break;
            }
        }
        */

       for (let checker of checks){
            let [[type, call]] = Object.entries(checker);
            if(call(value)){
                console.log(value, type);
                break;
            }
       }
    }

    static test(){
        let item = [
            "Name",
            "1234",
            [1,2,3,4,5],
            [],
            "http://www.bite.com.ng",
            "https://www.bite.com.ng",
            "dan.alonge@bite.com.ng",
            "123.20",
            "123.123.0",
            800,
            3.142

        ]

        item.forEach(o=>{
            Validator.check(o);
        })
    }
}
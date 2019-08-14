export function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function(value, key){
        obj[key] = value
    });

    return obj;
}
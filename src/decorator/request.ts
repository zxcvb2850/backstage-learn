export enum METHODS_TYPE {
    get = 'get',
    post = 'post',
}

export const get = requestDecorator(METHODS_TYPE.get);
export const post = requestDecorator(METHODS_TYPE.post);

function requestDecorator(type: METHODS_TYPE) {
    return (path: string) => {
        return (target: any, key: string) => {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

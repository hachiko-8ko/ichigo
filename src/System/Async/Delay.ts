export function delay(time: number): (result: any) => PromiseLike<any> {
    return (result: any) => new Promise(resolve => setTimeout(() => resolve(result), time));
}

export function delay(time: number) {
    return (result: any) => new Promise(resolve => setTimeout(() => resolve(result), time));
}

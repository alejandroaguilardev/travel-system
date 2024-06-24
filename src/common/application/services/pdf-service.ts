export interface IPdfService<T> {
    load(filePath: string): Promise<T>;
}

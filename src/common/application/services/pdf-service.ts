export interface IPdfService<T> {
    load(filePath: File): Promise<T>;
}

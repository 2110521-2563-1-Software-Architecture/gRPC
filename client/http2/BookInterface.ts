export interface Book {
    id: number,
    title: string,
    author: string,
}

export interface BookInterface {
    list(): Book[] | Promise<Book[]>;
    insert(book: Book): void | Promise<void>;
    findById(id: number): Book | Promise<Book>;
    delete(id: number): void | Promise<void>;
}
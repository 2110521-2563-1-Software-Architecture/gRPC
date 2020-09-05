import { } from 'node';
interface Book {
    _id: string;
    author: string;
    title: string;
}
  
interface Api {
    listBook() : void
    getBook(id: string) : void
    insertBook(book: Book) : void
    deleteBook(id: string) : void
}


var grpc = require('grpc');
var booksProto = grpc.load('books.proto');
var client = new booksProto.books.BookService('0.0.0.0:50051', grpc.credentials.createInsecure());
function printResponse(error : Error, response : string) {
    if (error)
        console.log('Error: ', error);
    else
        console.log(response);
}
function listBooks() {
    client.list({}, function (error: Error, books: Book[]) {
        printResponse(error, books.toString());
    });
}
function insertBook(id: string, title: string, author: string) {
    var book = {
        id: parseInt(id),
        title: title,
        author: author
    };
    client.insert(book, function (error: Error, empty: string) {
        printResponse(error, empty);
    });
}
function getBook(id : string) {
    client.get({
        id: parseInt(id)
    }, function (error: Error, book: Book) {
        printResponse(error, JSON.stringify(book));
    });
}
function deleteBook(id: string) {
    client.delete({
        id: parseInt(id)
    }, function (error: Error, empty: string) {
        printResponse(error, empty);
    });
}
function watchBooks() {
    var call = client.watch({});
    call.on('data', function (book: Book) {
        console.log(book);
    });
}

class GrpcAPI implements Api {
    listBook() {
        listBooks()
    }
  
    getBook(id : string) {
        getBook(id)
    }
    insertBook(book: Book) {
        insertBook(book._id,book.title,book.author)
    }
  
    deleteBook(id: string) {
        deleteBook(id)
    }
  
  }
  
const API : Api = new GrpcAPI
declare function require(name:string);

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();
if (command == 'list')
    API.listBook();
else if (command == 'insert')
    let book : Book = {
        _id : process.argv[0],
        title : process.argv[1],
        author : process.argv[2]
    };
    API.insertBook(book);
else if (command == 'get')
    API.getBook(process.argv[0]);
else if (command == 'delete')
    API.deleteBook(process.argv[0]);
// else if (command == 'watch')
//     watchBooks();
  

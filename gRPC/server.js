var grpc = require('grpc');
// add the events package
var events = require('events');
// add the bookStream global variable
var bookStream = new events.EventEmitter();
var booksProto = grpc.load('books.proto');
// In-memory array of book objects
var books = [
    { id: 123, title: 'A Tale of Two Cities', author: 'Charles Dickens' }
];
var server = new grpc.Server();
server.addService(booksProto.books.BookService.service, {
    list: function (call, callback) {
        callback(null, books);
    },
    insert: function (call, callback) {
        var book = call.request;
        books.push(book);
        // add the following to the insert method
        bookStream.emit('new_book', book);
        callback(null, {});
    },
    get: function (call, callback) {
        for (var i = 0; i < books.length; i++)
            if (books[i].id == call.request.id)
                return callback(null, books[i]);
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
    delete: function (call, callback) {
        for (var i = 0; i < books.length; i++) {
            if (books[i].id == call.request.id) {
                books.splice(i, 1);
                return callback(null, {});
            }
        }
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
    watch: function (stream) {
        bookStream.on('new_book', function (book) {
            stream.write(book);
        });
    },
});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');
server.start();
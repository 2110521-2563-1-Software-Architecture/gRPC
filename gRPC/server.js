/*
   Copyright 2016, Google, Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var grpc = require('grpc');

var booksProto = grpc.load('books.proto');

var events = require('events');
var bookStream = new events.EventEmitter();

// In-memory array of book objects
var books = [{
    id: 123,
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens'
}];

var server = new grpc.Server();
server.addService(booksProto.books.BookService.service, {
    list: function(call, callback) {
        callback(null, books);
    },
    insert: function(call, callback) {
        var book = call.request;
        books.push(book);
        bookStream.emit('new_book', book);
        callback(null, {});
    },
    get: function(call, callback) {
        for (var i = 0; i < books.length; i++)
            if (books[i].id == call.request.id)
                return callback(null, books[i]);
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'Not found'
        });
    },
    delete: function(call, callback) {
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
    watch: function(stream) {
        bookStream.on('new_book', function(book){
            stream.write(book);
        });
    }
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();

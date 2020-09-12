var grpc = require('grpc');
var booksProto = grpc.load('books.proto');
// var request = require('request');
var moment = require('moment');
const { without } = require('lodash');
var client = new booksProto.books.BookService('0.0.0.0:50051', grpc.credentials.createInsecure());
// var responseTimeArr = []
function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log(response);
}

function listBooks() {
    const startDate = moment();
    client.list({}, function (error, books) {
        const endDate = moment();
        console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
        // printResponse(error, books);
    });
    return endDate.diff(startDate)

}
function insertBook(id, title, author) {
    const startDate = moment();
    var book = {
        id: parseInt(id),
        title: title,
        author: author
    };
    client.insert(book, function (error, empty) {
        const endDate = moment();
        console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
        // printResponse(error, empty);
    });
    return endDate.diff(startDate)
}
function getBook(id) {
    var startDate = moment();
    client.get({
        id: parseInt(id)
    }, function (error, book) {
        var endDate = moment();
        console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
        // printResponse(error, book);
    });
}
function deleteBook(id) {
    var startDate = moment();
    await client.delete({
        id: parseInt(id)
    }, function (error, empty) {
        var endDate = moment();
        console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
        // printResponse(error, empty);
    });
}
function watchBooks() {
    var call = client.watch({});
    // var startDate = moment();
    call.on('data', function (book) {
        console.log(book);
        // var endDate = moment();
        // console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
    });
}

function sum(arr) {
    return arr.reduce(function (a, b) {
       return a + b;
    }, 0);
 }
  
function scenario(is_con, func, obj) {
    let n_con_req
    if (is_con) {
        n_con_req = 10
    } else {
        n_con_req = 1
    }
    // const promisesToAwait = [];
    // for (let i = 0; i < n_con_req; i++) {
    //   promisesToAwait.push(func(obj));
    // }
    // res = await Promise.all(promisesToAwait);
        
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();
if (command == 'list')
    listBooks();
else if (command == 'insert')
    insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
    getBook(process.argv[0]);
else if (command == 'delete')
    deleteBook(process.argv[0]);
else if (command == 'watch')
    watchBooks();
else if (command == "scenario") {
    const is_concurrent = process.argv[0]
    let is_con = false
    if(is_concurrent == "concurrent") {
        is_con = true
    }
    const action = process.argv[1]
    if(action == "get") {
        const id = process.argv[2]
        scenario(is_con, getBook, (id))
    } else if(action == "list"){
        scenario(is_con, listBooks)
    } else if(action == "delete"){
        const id = process.argv[2]
        scenario(is_con, deleteBook, (id))
    } else if(action == "insert"){
        const obj = (process.argv[2],process.argv[3],process.argv[4])
        scenario(is_con, insertBook,obj)
    }
}

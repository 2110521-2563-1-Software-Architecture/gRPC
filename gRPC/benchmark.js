var grpc = require('grpc');
var booksProto = grpc.load('books.proto');
// var request = require('request');
var moment = require('moment');
const { without } = require('lodash');
var client = new booksProto.books.BookService('0.0.0.0:50051', grpc.credentials.createInsecure());
let responseTimeArr = [];
function printResponse(error, response) {
	if (error) console.log('Error: ', error);
	else console.log(response);
}

async function listBooks() {
	return new Promise((resolve) => {
		client.list({}, function (error, books) {
			printResponse(error, books);
			resolve(true);
		});
	});
}

async function insertBook(id, title, author) {
	var book = {
		id: parseInt(id),
		title: title,
		author: author,
	};
	return new Promise((resolve) => {
		client.insert(book, function (error, books) {
			printResponse(error, books);
			resolve(true);
		});
	});
}

async function insertBooks(id, title, author) {
	var book = {
		id: parseInt(id),
		title: title,
		author: author,
	};
	const books = [];
	for (let i = 1; i <= 10; i++) {
		books.push(book);
	}
	return new Promise((resolve) => {
		client.insertList(books, function (error, books) {
			printResponse(error, books);
			resolve(true);
		});
	});
}

async function getBook(id) {
	return new Promise((resolve) => {
		client.get({ id: parseInt(id) }, function (error, book) {
			printResponse(error, book);
			resolve(true);
		});
	});
}

async function deleteBook(id) {
	return new Promise((resolve) => {
		client.delete({ id: parseInt(id) }, function (error, empty) {
			printResponse(error, empty);
			resolve(true);
		});
	});
}

var scenario = process.argv[2];
(async () => {
	if (scenario == 's1-1') {
		const start = moment();
		await insertBook(process.argv[3], process.argv[4], process.argv[5]);
		const end = moment();
		console.log('Request took: ' + end.diff(start) + ' ms.');
	} else if (scenario == 's1-2') {
		const start = moment();
		await insertBooks(process.argv[3], process.argv[4], process.argv[5]);
		const end = moment();
		console.log('Request took: ' + end.diff(start) + ' ms.');
	} else if (scenario == 's2') {
		const start = moment();
		const insertB = insertBook('191', 'Jonh wick', 'Adam');
		const getB = getBook('123');
		const getBs = listBooks();
		const deleteB = deleteBook('234');
		const toWait = [insertB, getBs, getB, deleteB];
		await Promise.all(toWait);
		const end = moment();
		console.log('Request took: ' + end.diff(start) + ' ms.');
	} else if (scenario == 's3') {
		const response = [];
		for (let i = 1; i <= 4096; i = i + 45) {
			console.log(i);
			const start = moment();
			const toWait = [];
			for (let c = 1; c <= i; c++) {
				toWait.push(listBooks());
			}
			await Promise.all(toWait);
			const end = moment();
			response.push(end.diff(start));
		}
		console.log(response);
	} else {
		listBooks();
	}
})();

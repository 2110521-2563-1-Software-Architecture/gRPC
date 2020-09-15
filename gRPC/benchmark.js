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
	var books = []
	for (let i = 1; i <= 2; i = i + 1) {
		books.push(book)
	}
	return new Promise((resolve) => {
		client.insertList(books, function (error, books) {
			printResponse(error, books);
			resolve(true);
		});
	});
}

function getBook(id) {
	var startDate = moment();
	client.get(
		{
			id: parseInt(id),
		},
		function (error, book) {}
	);
}
function deleteBook(id) {
	var startDate = moment();
	client.delete(
		{
			id: parseInt(id),
		},
		function (error, empty) {
			var endDate = moment();
			console.log('Request took: ' + endDate.diff(startDate) + ' ms.');
			// printResponse(error, empty);
			responseTimeArr.push(endDate.diff(startDate));
		}
	);
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

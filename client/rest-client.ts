import axios, { AxiosResponse } from 'axios';
import moment from 'moment';

interface Book {
	_id: string;
	id: string;
	author: string;
	title: string;
}

interface NewBook {
	id: string;
	author: string;
	title: string;
}

interface Api {
	listBooks(): Promise<AxiosResponse<any>>;
	getBook(id: string): Promise<AxiosResponse<any>>;
	insertBook(book: NewBook): Promise<AxiosResponse<any>>;
	deleteBook(id: string): Promise<AxiosResponse<any>>;
	insertBookList(bookList: Array<NewBook>): any;
}

function random(): string {
	return (Math.floor(Math.random() * Math.floor(999999999)) + 1).toString();
}

class Client implements Api {
	private api = axios.create({
		baseURL: 'http://localhost:3000/book',
	});

	async listBooks() {
		return this.api.get<Book[]>('/');
	}

	async getBook(id: string) {
		return this.api.get<Book>(`/${id}`);
	}

	async insertBook(book: NewBook) {
		console.log(book);
		return this.api.post('/', book);
	}

	async deleteBook(id: string) {
		return this.api.delete(`/${id}`);
	}

	async insertBookList(bookList: Array<NewBook>) {
		return this.api.post('/multiple', bookList);
	}
}

var scenario = process.argv[2];
(async () => {
	const client = new Client();
	if (scenario == 's1-1') {
		const start = moment();
		await client.insertBook({
			id: process.argv[3],
			title: process.argv[4],
			author: process.argv[5],
		});
		const end = moment();
		console.log('Request took: ' + end.diff(start) + ' ms.');
	} else if (scenario == 's1-2') {
		const start = moment();
		const bks = [];
		for (let i = 1; i <= 10; i++) {
			const bk = {
				id: random(),
				title: process.argv[4],
				author: process.argv[5],
			};
			bks.push(bk);
		}
		await client.insertBookList(bks);
		const end = moment();
		console.log('Request took: ' + end.diff(start) + ' ms.');
	} else if (scenario == 's2') {
		//mock
		const ran1 = random();
		const ran2 = random();
		const ran3 = random();
		await client.insertBook({ id: ran1, title: 'Jonh wick', author: 'Adam' });
		await client.insertBook({ id: ran2, title: 'Jonh wick', author: 'Adam' });
		//endmock

		const start = moment();
		const insertB = client.insertBook({ id: ran3, title: 'Jonh wick', author: 'Adam' });
		const getB = client.getBook(ran1);
		const getBs = client.listBooks();
		const deleteB = client.deleteBook(ran2);
		const toWait = [insertB, getBs, getB, deleteB];
		await Promise.all(toWait);
		const end = moment();
		console.log('Request took: ' + end.diff(start) + ' ms.');
	} else if (scenario == 's3') {
		const response = [];
		for (let i = 1; i <= 1036; i = i + 45) {
			console.log(i);
			const start = moment();
			const toWait = [];
			for (let c = 1; c <= i; c++) {
				toWait.push(client.listBooks());
			}
			await Promise.all(toWait);
			const end = moment();
			response.push(end.diff(start));
		}
		console.log(response);
	} else {
		console.log((await client.listBooks()).data);
	}
})();

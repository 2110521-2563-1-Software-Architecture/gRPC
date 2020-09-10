import { BookInterface, Book } from './BookInterface'
import axios, { AxiosInstance } from 'axios'

class RestClient implements BookInterface {
  private client: AxiosInstance

  constructor(host: string, port: number | string) {
    this.client = axios.create({ baseURL: `${host}:${port}` })
  }

  async list(): Promise<Book[]> {
    try {
      const books = await (await this.client.get('/book')).data
      return books
    } catch (e) {
      throw new Error('Cannot list book' + e.message)
    }
  }

  async insert(book: Book): Promise<void> {
    try {
      const res = await (await this.client.post('/book/create', { ...book }))
        .data
      return res
    } catch (e) {
      throw new Error('Cannot insert book')
    }
  }

  async findById(id: number): Promise<Book> {
    try {
      const book = await (await this.client.get(`/book/${id}`)).data
      return book
    } catch (e) {
      throw new Error('Cannot find book')
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const res = await (await this.client.delete(`/book/${id}`)).data
      return res
    } catch (e) {
      throw new Error('Cannot delete book')
    }
  }
}

async function run() {
  console.log("hoi")
  let processName = process.argv.shift()
  let scriptName = process.argv.shift()
  let command = process.argv.shift()

  let restClient = new RestClient('http://localhost', 3000)

  if (command == 'list') console.log(await restClient.list())
  else if (command == 'insert')
    console.log(
      await restClient.insert({
        id: +process.argv[0],
        title: process.argv[1],
        author: process.argv[2],
      }),
    )
  else if (command == 'get')
    console.log(await restClient.findById(+process.argv[0]))
  else if (command == 'delete')
    console.log(await restClient.delete(+process.argv[0]))
}

run()
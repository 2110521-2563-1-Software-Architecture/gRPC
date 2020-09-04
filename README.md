# gRPC

> 2110521 (Student 2020/1) - Software Architecture

## Members

1. Nonthanat Theeratanapartkul 6031019821
2. Krit Kruaykitanon 6031002021
3. Nithipud Tunticharoenviwat 6031032921
4. Tanawit Kritwongwiman 6031021021

## 1. Swagger for APIs

![swagger-screenshots](http://lmsotfy.com/so.png)

## 2. Source codes

> [Client code](https://github.com/2110521-2563-1-Software-Architecture/gRPC/tree/master/client)

> [REST API code](https://github.com/2110521-2563-1-Software-Architecture/gRPC/tree/master/rest-api)

## 3. Compare how to call the methods based on gRPC and REST API

| Function     | gRPC                                            | REST API                   |
| ------------ | ----------------------------------------------- | -------------------------- |
| List books   | client.List(ctx, &pb.Empty{})                   | api.get("/")               |
| Insert books | client.Insert(ctx, book)                        | api.post("/", book)        |
| Get books    | client.Get(ctx, &pb.BookIdRequest{int32(id)})   | api.get(`/${id}`)          |
| Delete books | client.Delete(ctx, &pb.BookIdRequest{int32(id)} | api.delete(`/${book._id}`) |
| Watch books  | client.Watch(ctx, &pb.Empty{})                  | -                          |

## 4. What are the main differences between REST API and gRPC?

One of the biggest differences between REST and gRPC is the format of the payload. REST messages typically contain JSON. This is not a strict requirement, and in theory you can send anything as a response, but in practice the whole REST ecosystem—including tooling, best practices, and tutorials—is focused on JSON.

## 5. What is the benefits of introduce interface in front of the gRPC and REST API of the book services.

gRPC uses HTTP/2 to support highly performant and scalable API's and makes use of binary data rather than just text which makes the communication more compact and more efficient. gRPC makes better use of HTTP/2 then REST. gRPC for example makes it possible to turn-off message compression.

## 6. Based on the introduced interface, compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a

| Function     | gRPC                                                | REST API |
| ------------ | --------------------------------------------------- | -------- |
| List books   | call api.listBook()                                 | call api.listBook()    |
| Insert books | go run client.go insert \<id\> \<title\> \<author\> | call api.insertBook()            |
| Get books    | go run client.go get \<id\>                         | call api.getBook()             |
| Delete books | go run client.go delete \<id\>                      | call api.deleteBook()             |
| Watch books  | -                         | -        |

## 7. Component diagram with interfaces.

![swagger-screenshots](http://lmsotfy.com/so.png)

# gRPC

> 2110521 (Student 2020/1) - Software Architecture

## Members
| Firstname |      Lastname      | Studnet ID |
|-----------|--------------------|------------|
| Krit      | Kruaykitanon       | 6031002021 |
| Nonthanat | Theeratanapartkul  | 6031019821 |
| Tanawit   | Kritwongwiman      | 6031021021 |
| Nithipud  | Tunticharoenviwat  | 6031032921 |

<br>

## 1. Swagger for APIs

![swagger-screenshots](https://raw.githubusercontent.com/2110521-2563-1-Software-Architecture/gRPC/master/pic/swagger.png)

<br>  

## 2. Source codes

#### REST
- [REST Client](https://github.com/2110521-2563-1-Software-Architecture/gRPC/blob/master/client/src/Assignments/AssignmentI.tsx)  
- [REST API](https://github.com/2110521-2563-1-Software-Architecture/gRPC/tree/master/rest-api)

#### gRPC
- [gRPC Client](https://github.com/2110521-2563-1-Software-Architecture/gRPC/blob/master/gRPC/client.js)  
- [gRPC API](https://github.com/2110521-2563-1-Software-Architecture/gRPC/tree/master/gRPC)

<br>  

## 3. Compare how to call the methods based on gRPC and REST API

| Function     | gRPC                                            | REST API                   |
| ------------ | ----------------------------------------------- | -------------------------- |
| List books   | client.List(ctx, &pb.Empty{})                   | api.get("/")               |
| Insert books | client.Insert(ctx, book)                        | api.post("/", book)        |
| Get books    | client.Get(ctx, &pb.BookIdRequest{int32(id)})   | api.get(`/${id}`)          |
| Delete books | client.Delete(ctx, &pb.BookIdRequest{int32(id)} | api.delete(`/${book._id}`) |
| Watch books  | client.Watch(ctx, &pb.Empty{})                  | -                          |

<br>  

## 4. What are the main differences between REST API and gRPC?

One of the biggest differences between REST and gRPC is the format of the payload. REST messages typically contain JSON. This is not a strict requirement, and in theory you can send anything as a response, but in practice the whole REST ecosystem—including tooling, best practices, and tutorials—is focused on JSON.

<br>

## 5. What is the benefits of introduce interface in front of the gRPC and REST API of the book services.

gRPC uses HTTP/2 to support highly performant and scalable API's and makes use of binary data rather than just text which makes the communication more compact and more efficient. gRPC makes better use of HTTP/2 then REST. gRPC for example makes it possible to turn-off message compression.

<br>

## 6. Based on the introduced interface, compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a

| Function     | gRPC                                                | REST API |
| ------------ | --------------------------------------------------- | -------- |
| List books   |  API.listBook()                                 |  API.listBook()    |
| Insert books |  API.insertBook(book)                               |  API.insertBook(book)            |
| Get books    |  API.getBook(id)                                  |  API.getBook(id)             |
| Delete books |  API.deleteBook(id)                                |  API.deleteBook(id)             |
| Watch books  | -                         | -        |

<br>  

## 7. Component diagram with interfaces.

![component-diagram](https://raw.githubusercontent.com/2110521-2563-1-Software-Architecture/gRPC/master/pic/component_diagram.jpeg)
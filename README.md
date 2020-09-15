# Assignment #2: gRPC and REST API benchmarking

> 2110521 (Student 2020/1) - Software Architecture

## Members

| First Name | Last Name         | Student ID |
| ---------- | ----------------- | ---------- |
| Krit       | Kruaykitanon      | 6031002021 |
| Nonthanat  | Theeratanapartkul | 6031019821 |
| Tanawit    | Kritwongwiman     | 6031021021 |
| Nithipud   | Tunticharoenviwat | 6031032921 |

## Client

### Rest Client https://github.com/2110521-2563-1-Software-Architecture/gRPC/blob/test-http2/client/rest-client.ts

### gRPC Client https://github.com/2110521-2563-1-Software-Architecture/gRPC/blob/test-http2/gRPC/grpc-client.js

<br>

## 1. Graphs showing the benchmark results wih the explanation of experimental setting

### a1: Single client with a small call to insert a book item

![s1-1](/pic/s1-1.png)

a book was mocked and inserted

### a2: A bigger call to insert a list of multiple book items

![s1-2](/pic/s1-2.png)

10 books were mocked and inserted

### b: Multiple clients with different kind of calls

![s2](/pic/s2.png)

insert, get, getList and delete were called at the same time

### c: Vary the number of concurrent calls from 1 to 4096 calls

![s3](/pic/s3.png)

Get book list function was called concurrently from 1 to 4096 and response time was measured before the first request was performed and stopped when the last request was responded.

**_REST API is very slow, so that we don’t make an experiment to 4096 concurrent calls._**

## 2. Discussion of the results why one method is better the other in which scenarios

gRPC is faster than REST because of these following reasons

1. Unlike gRPC where the data is stored in a memory, REST API data is stored in Mongodb. As a result, there are some factors like a network congestion from backend server connecting to database server.
2. GRpc comes with an interface with language-native objects which is used to pass into and accept from them. Most errors would have been caught by the compiler, and no object is not needed to be created.
3. REST API uses http1.1 protocol while gRPC is using http2 which makes less response time in a normal situation which has several capabilities such as request multiplexing.

## 3. Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance

| Aspect           | REST                                                                                                                                         | gRPC                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language Neutral | Support Nearly every type of environment from mobile to web, Json libraries exist is most of programming language (and it’s just plain text) | Support most popular languages and platform (C++, Java, Python, Go Ruby, C#, Objective-C, Javascript) **In turn arguably not mature enough for production use** |
| Ease of Use      | write more code                                                                                                                              | write less code, High learning curve, Less support, Harder to debug directly                                                                                    |
| Performance      | slower                                                                                                                                       | faster                                                                                                                                                          |

## 4. Does results comply with the results in https://medium.com/@bimeshde/grpc-vs-rest-performance-simplified-fd35d01bbd4

The results comply with the experiment in the Medium blog since our results also indicate that gRPC provides better performance.  
Note that in our experiments, the REST API service is associated with a database that is deployed on the cloud, so there will be some network overhead involved and this increases REST response time. While gRPC uses a local database server.  
However, our experiments are not exactly the same as in the blog since our client connects to the server using HTTP/1.1 but the experiments in the blog use HTTP/2.

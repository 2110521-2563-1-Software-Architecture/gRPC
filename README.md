# gRPC
> 2110521 (Student 2020/1) - Software Architecture
<br>
<br>

## Members

1. Nonthanat Theeratanapartkul
2. Krit Kruaykitanon 6031002021
3. Nithipud Tunticharoenviwat
4. Tanawit Kritwongwiman
<br>
<br>

## Swagger for APIs
![swagger-screenshots](http://lmsotfy.com/so.png)

## Compare how to call the methods based on gRPC and REST API 
Function | gRPC | REST API
---------|------|---------
List books|...|...<br>...
Insert books|...|...
...|...|...
...|...|...
<br>
<br>

## What are the main differences between REST API and gRPC?
One of the biggest differences between REST and gRPC is the format of the payload. REST messages typically contain JSON. This is not a strict requirement, and in theory you can send anything as a response, but in practice the whole REST ecosystem—including tooling, best practices, and tutorials—is focused on JSON.
<br>
<br>

## What is the benefits of introduce interface in front of the gRPC and REST API of the book services. 
gRPC uses HTTP/2 to support highly performant and scalable API's and makes use of binary data rather than just text which makes the communication more compact and more efficient. gRPC makes better use of HTTP/2 then REST. gRPC for example makes it possible to turn-off message compression.
<br>
<br>

## Based on the introduced interface, compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a
Function | gRPC | REST API
---------|------|---------
List books|...|...<br>...
Insert books|...|...
...|...|...
...|...|...
<br>
<br>

## Component diagram with interfaces. 
![swagger-screenshots](http://lmsotfy.com/so.png)
<br>
<br>

## Component diagram without interfaces. 
![swagger-screenshots](http://lmsotfy.com/so.png)
<br>
<br>

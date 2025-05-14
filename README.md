# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## Test Curl

```
curl localhost:3000/api/v1/article -X POST -H "Content-Type:application/json" -d '[{"title":"标题1","content":"内容1"},{"title":"标题2","content":"内容2"}]'
curl localhost:3000/api/v1/article -X POST -H "Content-Type:application/json" -d '{"title":"comewords","content":"articleContent"}'

curl localhost:3000/api/v1/article/first -X PUT -H "Content-Type:application/json" -d '{"title":"新标题"}'
curl localhost:3000/api/v1/article/1 -X PUT -H "Content-Type:application/json" -d '{"title":"新标题"}'
curl localhost:3000/api/v1/article/1,2,3 -X PUT -H "Content-Type:application/json" -d '{"status":"DELETED"}'
curl localhost:3000/api/v1/article/batch -X PUT -H "Content-Type:application/json" -d '[{"id":1,"title":"新标题1"},{"id":2,"title":"新标题2"}]'
```
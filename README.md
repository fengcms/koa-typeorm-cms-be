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
curl localhost:3000/api/v1/manages -X POST -H "Content-Type:application/json" -d '{"account":"admin","password":"RdlP1t07VcJSuFOUh+5CXT1PDQBDzrWqsn0LHJyndc6hzmmRCUjzI3Ag091znGMjHGtdvkSsCLQ154QmS+lUPfy+i5b2w5iWai3Ty+brTYtHkdJD1HENqsCVhC/UNLp+I73nrsdz7JHR2/hkNkEpYRi5+DBYr73Dxa2FR3A2//eMoL8h8B/x0BQD28GwDiWJE6Z2/GX9mXCF2d41u3RycYCAKI7XlCATGO5Q1gmMLZNWE5jhNLSkxCO2eMk8T+YRrI7z5YGiHAiUmXdu8GMhPxPqWWdyes5j9v9U6CuV9DbqhcXV93crEFaR6SD45X0Do8aVKlZNcTbpdy3bubiuPg=="}'
curl localhost:3000/api/v1/manages/1 -X DELETE 
```
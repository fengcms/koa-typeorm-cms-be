# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## Make RSA Key
```
openssl genrsa -out src/config/key/rsa_private_key.pem 2048
openssl rsa -in src/config/key/rsa_private_key.pem -pubout -out src/config/key/rsa_public_key.pem
```

## Login
```
curl localhost:3000/api/v1/login -X POST -H "Content-Type:application/json" -d '{"account":"fungleo","password":"OOSzmYc6hqzyuErV2HUcpI91fjGJHrjTpsaQ8lNOn69Z+Y3dtaTqtRHozW+mPLfIbOIv2lW2o4lvF2X+VXE5v2R5gt0ogr6MzBlUu1fDk/me4k/cHUm/u+qUfg02iXuCRyoNAgyY32KOgCioO1A32BKOpsbcBQ0CFUcRCO19X88=", "role":"admin"}'
```

## Test Curl

```
curl localhost:3000/api/v1/article -X POST -H "Content-Type:application/json" -d '[{"title":"标题1","content":"内容1"},{"title":"标题2","content":"内容2"}]'
curl localhost:3000/api/v1/article -X POST -H "Content-Type:application/json" -d '{"title":"comewords","content":"articleContent"}'

curl localhost:3000/api/v1/article/first -X PUT -H "Content-Type:application/json" -d '{"title":"新标题"}'
curl localhost:3000/api/v1/article/1 -X PUT -H "Content-Type:application/json" -d '{"title":"新标题"}'
curl localhost:3000/api/v1/article/1,2,3 -X PUT -H "Content-Type:application/json" -d '{"status":"DELETED"}'
curl localhost:3000/api/v1/article/batch -X PUT -H "Content-Type:application/json" -d '[{"id":1,"title":"新标题1"},{"id":2,"title":"新标题2"}]'
curl localhost:3000/api/v1/manages -X POST -H "Content-Type:application/json" -d '{"account":"fungleo","name":"FungLeo","password":"OOSzmYc6hqzyuErV2HUcpI91fjGJHrjTpsaQ8lNOn69Z+Y3dtaTqtRHozW+mPLfIbOIv2lW2o4lvF2X+VXE5v2R5gt0ogr6MzBlUu1fDk/me4k/cHUm/u+qUfg02iXuCRyoNAgyY32KOgCioO1A32BKOpsbcBQ0CFUcRCO19X88="}'
curl localhost:3000/api/v1/manages/1 -X DELETE 
curl localhost:3000/api/v1/manages\?password=123456 
curl localhost:3000/api/v1/article -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJhY2NvdW50IjoiYWRtaW4iLCJpZCI6NCwidGltZSI6IjIwMjUtMDUtMThUMDU6NDc6MDEuMjYyWiIsImlhdCI6MTc0NzU0NzIyMSwiZXhwIjoxNzQ3NjMzNjIxfQ.pfj-m07nAhJ6otlsnAxESBbUPiWdfHYMeUdYbZI6Np8"
curl localhost:3000/api/v1/manages/3 -X PUT -H "Content-Type:application/json" -d '{"account":"test","password":"2222"}'
curl localhost:3000/api/v1/login -X POST -H "Content-Type:application/json" -d '{"account":"fungleo","password":"OOSzmYc6hqzyuErV2HUcpI91fjGJHrjTpsaQ8lNOn69Z+Y3dtaTqtRHozW+mPLfIbOIv2lW2o4lvF2X+VXE5v2R5gt0ogr6MzBlUu1fDk/me4k/cHUm/u+qUfg02iXuCRyoNAgyY32KOgCioO1A32BKOpsbcBQ0CFUcRCO19X88=", "role":"admin"}'



curl localhost:3000/api/v1/article -X POST -H "Content-Type:application/json"  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJhY2NvdW50IjoiYWRtaW4iLCJpZCI6NCwidGltZSI6IjIwMjUtMDUtMThUMDU6NDc6MDEuMjYyWiIsImlhdCI6MTc0NzU0NzIyMSwiZXhwIjoxNzQ3NjMzNjIxfQ.pfj-m07nAhJ6otlsnAxESBbUPiWdfHYMeUdYbZI6Np8" -d '{"title":"comewords","content":"articleContent","channel_id": 1}'

curl localhost:3000/api/v1/upload -F "file=@/Users/fungleo/Downloads/huxing.jpg" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJhY2NvdW50IjoiYWRtaW4iLCJpZCI6NCwidGltZSI6IjIwMjUtMDUtMThUMDU6NDc6MDEuMjYyWiIsImlhdCI6MTc0NzU0NzIyMSwiZXhwIjoxNzQ3NjMzNjIxfQ.pfj-m07nAhJ6otlsnAxESBbUPiWdfHYMeUdYbZI6Np8"

curl localhost:3000/api/v1/users  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJhY2NvdW50IjoiYWRtaW4iLCJpZCI6NCwidGltZSI6IjIwMjUtMDUtMThUMDU6NDc6MDEuMjYyWiIsImlhdCI6MTc0NzU0NzIyMSwiZXhwIjoxNzQ3NjMzNjIxfQ.pfj-m07nAhJ6otlsnAxESBbUPiWdfHYMeUdYbZI6Np8"

curl localhost:3000/api/v1/profile  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJhY2NvdW50IjoiYWRtaW4iLCJpZCI6NCwidGltZSI6IjIwMjUtMDUtMThUMDU6NDc6MDEuMjYyWiIsImlhdCI6MTc0NzU0NzIyMSwiZXhwIjoxNzQ3NjMzNjIxfQ.pfj-m07nAhJ6otlsnAxESBbUPiWdfHYMeUdYbZI6Np8"

curl localhost:3000/api/v1/tree_channel

```
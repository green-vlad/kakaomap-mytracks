# Web application for displaying tracks in GPX format on KakaoMap.

## Backend

1. cd laravel-api
2. docker compose up -d
3. enter to app container
`docker exec -it app bash`
and run
`composer install`
The backend runs on the port 8080. Port can be changed in the docker-compose.yml

## Frontend
Required: Node.js, npm.
To start frontend run
`npm start`
If you want to change backend end-points root edit file react-kakaomap/src/axios-client.js
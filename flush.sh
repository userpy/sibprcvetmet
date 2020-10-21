echo 'flush *****'
docker rmi -f sibprcvetmet_client sibprcvetmet_server
docker rm sibprcvetmet_client_1 sibprcvetmet_server_1
docker rm sibprcvetmet_mongo_1
echo '***********************'

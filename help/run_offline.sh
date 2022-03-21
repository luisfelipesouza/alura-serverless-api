docker network create lambda-local

# create DynamoDB
docker run -d -v ~/Documents/Projects/docker_volumes/dynamodb:/dynamodb -p 8000:8000 --network lambda-local --name dynamodb amazon/dynamodb-local
#  docker run -d -v ~/Documents/Projects/docker_volumes/dynamodb:/dynamodb -p 8001:8001 --network lambda-local --name dynamodb-admin instructure/dynamo-local-admin

# create DynamoDB Table
aws dynamodb create-table --cli-input-json file://events/create-table.json --endpoint-url http://localhost:8000

# start local API + warmup lambdas
sam local start-api --docker-network lambda-local --warm-containers EAGER --debug
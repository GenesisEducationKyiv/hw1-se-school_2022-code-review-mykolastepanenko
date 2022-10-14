dev-up:
	docker-compose -f docker-compose.dev.yml up --build -d
dev-down:
	docker-compose -f docker-compose.dev.yml down
up:
	docker-compose up --build -d
down:
	docker-compose down
docker-logs:
	docker logs hw1-se-school_2022-code-review-mykolastepanenko_server_1 --follow
include .env
QVERSION=$(shell jq .version app/package.json)
DOCKER_VERSION=$(patsubst "%",%,$(QVERSION))

ifndef DOCKER_REGISTRY
$(error DOCKER_REGISTRY is not set)
endif

ifndef DOCKER_ARTIFACT
$(error DOCKER_ARTIFACT is not set)
endif

ifndef DOCKER_VERSION
$(error DOCKER_VERSION is not set)
endif

build:
	docker build --rm -t ${DOCKER_ARTIFACT}:latest .

delete:
	docker image rm ${DOCKER_ARTIFACT}:latest

tag:
	docker tag ${DOCKER_ARTIFACT}:latest ${DOCKER_REGISTRY}/${DOCKER_ARTIFACT}:latest
	docker tag ${DOCKER_ARTIFACT}:latest ${DOCKER_REGISTRY}/${DOCKER_ARTIFACT}:${DOCKER_VERSION}

push:
	docker login -u admin -p admin1234 ${DOCKER_REGISTRY}
	docker push -a ${DOCKER_REGISTRY}/${DOCKER_ARTIFACT}

run:
	docker run --rm --name ${DOCKER_ARTIFACT} -p 8000:80 -e LOG_LEVEL=debug -e MAX_WORKERS=1 \
		-v /docker/images/blocklist:/app \
		${DOCKER_ARTIFACT} /start-reload.sh

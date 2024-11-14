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
	docker build --rm -t ${DOCKER_ARTIFACT}:${DOCKER_VERSION} .

delete:
	docker image rm ${DOCKER_ARTIFACT}:${DOCKER_VERSION}
	docker image rm ${DOCKER_REGISTRY}/${DOCKER_ARTIFACT}:${DOCKER_VERSION}

tag:
	docker tag ${DOCKER_ARTIFACT}:${DOCKER_VERSION} ${DOCKER_REGISTRY}/${DOCKER_ARTIFACT}:${DOCKER_VERSION}

push: tag
	docker login -u admin -p 3ntradA9 ${DOCKER_REGISTRY}
	docker push ${DOCKER_REGISTRY}/${DOCKER_ARTIFACT}:${DOCKER_VERSION}

run:
	docker run --rm --name ${DOCKER_ARTIFACT} -p 8000:80 -e LOG_LEVEL=debug -e MAX_WORKERS=1 \
		-v /docker/images/blocklist:/app \
		${DOCKER_ARTIFACT} /start-reload.sh

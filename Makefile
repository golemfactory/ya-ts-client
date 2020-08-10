

all:
	echo help


setup: m.setup m.patch

m.setup:
	./build-scripts/setup-target.sh
	./build-scripts/gen-all.sh
	touch m.setup

m.patch: m.setup
	./build-scripts/apply-patches.sh
	touch m.patch

m.build: m.patch
	cd src/ya-activity && yarn && yarn build
	cd src/ya-market && yarn && yarn build
	cd src/ya-payment && yarn && yarn build

clean:
	find target \! -name 'openapi-generator-cli.jar' -delete
	rm m.*

.PHONY: all


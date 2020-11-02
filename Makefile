

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

	mkdir -p dist/ya-activity dist/ya-market dist/ya-payment
	cp -r src/ya-activity/dist/* dist/ya-activity
	cp -r src/ya-market/dist/* dist/ya-market
	cp -r src/ya-payment/dist/* dist/ya-payment

clean:
	find target \! -name 'openapi-generator-cli.jar' -delete
	rm m.*

.PHONY: all


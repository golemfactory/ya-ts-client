

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
	cd src/ya-activity && npm i && npm run build
	cd src/ya-market && npm i && npm run build
	cd src/ya-payment && npm i && npm run build
	cd src/ya-net && npm i && npm run build

	mkdir -p dist/ya-activity dist/ya-market dist/ya-payment dist/ya-net
	cp -r src/ya-activity/dist/* dist/ya-activity
	cp -r src/ya-market/dist/* dist/ya-market
	cp -r src/ya-payment/dist/* dist/ya-payment
	cp -r src/ya-net/dist/* dist/ya-net

clean:
	rm -rf target/ dist/
	rm m.*

.PHONY: all


#! /bin/bash 

expand_path() {
	local curdir

	curdir="$(pwd)"
	cd $1
	pwd
	cd "$curdir"
}

BUILDDIR=$(expand_path target)

echo builddir $BUILDDIR
test -d "$BUILDDIR" || exit 1

gen() {
	local NAME=$1
	local VERSION=$2
	local PROJECT_NAME=ya-$NAME
	local PKG_NAME=ya_$NAME
	
	cd "$BUILDDIR"
	
	java -jar $BUILDDIR/openapi-generator-cli.jar \
		generate -g typescript-node \
		--package-name "$PKG_NAME" \
		-o "$BUILDDIR/$PROJECT_NAME" \
		-p npmName="$PROJECT_NAME",npmVersion="$VERSION",typescriptThreePlus=true,supportsES6=true \
		-i ../ya-client/specs/${NAME}-api.yaml \
		--skip-validate-spec --strict-spec false \
		--global-property=apiDocs=false,modelDocs=false
}

gen activity 	0.1.0
gen payment		0.1.0
gen market		0.1.0

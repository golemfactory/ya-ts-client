#! /bin/bash 

fail() {
	echo $@ >&2
	exit 1
}

BUILDDIR=target
GENERATOR_VERSION=5.2.0
GENERATOR="$BUILDDIR/openapi-generator-cli.jar"

mkdir -p "$BUILDDIR"
if ! test -f "$GENERATOR"; then
	if ! command -v curl; then
		wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${GENERATOR_VERSION}/openapi-generator-cli-${GENERATOR_VERSION}.jar -O "$GENERATOR"
	else
		curl https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${GENERATOR_VERSION}/openapi-generator-cli-${GENERATOR_VERSION}.jar -o "$GENERATOR"
	fi
fi

test "$(java -jar "$GENERATOR" version)" == "$GENERATOR_VERSION" || fail "unable to setup openapi generator"

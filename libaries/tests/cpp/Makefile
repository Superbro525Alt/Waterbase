.PHONY: all build run

all: build-lib build run

build-lib:
	@echo "Building Library..."
	cd ../../cpp && make all

build:
	@echo "Building..."
	g++ src/main.cpp -o build/waterbase_test.out -Isrc/include -Llib -lwaterbase -lrequests -lcpr

run:
	@echo "Running..."
	./build/waterbase_test.out

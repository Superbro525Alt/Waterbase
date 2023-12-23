.PHONY: all build run

all: setup build-lib build run

setup:
	@echo "Setting up..."
	mkdir -p build

build-lib:
	@echo "Building Library..."
	cd ../../cpp && make all

build:
	@echo "Building..."
	g++ src/main.cpp -o build/waterbase_test.out -Isrc/include -Llib -lwaterbase -lrequests -lcpr

run:
	@echo "Running..."
	./build/waterbase_test.out

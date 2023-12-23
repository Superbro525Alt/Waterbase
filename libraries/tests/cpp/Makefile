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
	g++ src/main.cpp -o build/waterbase_test.out -L/usr/local/lib/waterbase -Iwaterbase -lraw -lrequests -lmultiplayer -lcpr

run:
	@echo "Running..."
	./build/waterbase_test.out

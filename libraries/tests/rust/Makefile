.PHONY: all build run

all: setup build run

setup:
	@echo "Setting up..."
	mkdir -p build

build-lib:
	@echo "Building Library..."
	cd ../../rust && cargo build

build:
	@echo "Building..."
	cargo build

run:
	@echo "Running..."
	./target/debug/waterbase-test

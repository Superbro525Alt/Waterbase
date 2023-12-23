.PHONY: setup all build create install


all: setup build create install

setup:
	@echo "Setting up..."
	mkdir -p build
	mkdir -p lib

build:
	@echo "Building..."
	g++ -c src/cpp/waterbase.cpp -o build/waterbase.o
	g++ -c src/cpp/requests.cpp -o build/requests.o

create:
	@echo "Creating..."
	ar -rcs lib/libwaterbase.a build/waterbase.o
	ar -rcs lib/librequests.a build/requests.o

install:
	@echo "Installing..."
	sudo cp lib/libwaterbase.a /usr/local/lib
	sudo cp lib/librequests.a /usr/local/lib

	sudo cp src/include/waterbase.h /usr/local/include
	sudo cp src/include/requests.h /usr/local/include
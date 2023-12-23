.PHONY: setup all build create install


all: setup build create install

setup:
	@echo "Setting up..."
	mkdir -p build
	mkdir -p lib

build:
	@echo "Building..."
	g++ -c src/cpp/raw.cpp -o build/raw.o
	g++ -c src/cpp/requests.cpp -o build/requests.o
	g++ -c src/cpp/multiplayer.cpp -o build/multiplayer.o

create:
	@echo "Creating..."
	ar -rcs lib/libraw.a build/raw.o
	ar -rcs lib/librequests.a build/requests.o
	ar -rcs lib/libmultiplayer.a build/multiplayer.o

install:
	@echo "Installing..."

	sudo mkdir -p /usr/local/lib/waterbase
	sudo mkdir -p /usr/local/include/waterbase

	sudo cp lib/libraw.a /usr/local/lib/waterbase
	sudo cp lib/librequests.a /usr/local/lib/waterbase
	sudo cp lib/libmultiplayer.a /usr/local/lib/waterbase

	sudo cp src/include/raw.h /usr/local/include/waterbase
	sudo cp src/include/requests.h /usr/local/include/waterbase
	sudo cp src/include/multiplayer.h /usr/local/include/waterbase
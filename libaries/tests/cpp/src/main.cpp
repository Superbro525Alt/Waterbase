#include <iostream>
#include "waterbase.h"

int main(int argc, char const *argv[])
{
    RawServer server = RawServer("http://localhost:3000", "test");

    server.del("test");

    return 0;
}
#include <iostream>
#include "waterbase/raw.h"
#include "waterbase/multiplayer.h"

int main(int argc, char const *argv[])
{
    //RawServer server = RawServer("http://localhost:3000", "test");

    MultiplayerServer server = MultiplayerServer("http://localhost:3000", "test");

    Player player = Player(&server, "players/1", new Vector(1.0, 2.0, 3.0));

    return 0;
}
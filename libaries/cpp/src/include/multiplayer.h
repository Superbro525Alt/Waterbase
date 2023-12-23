#pragma once

#include "raw.h"

class Vector
{
    public:
        Vector(float x, float y, float z);
        float x;
        float y;
        float z;
};


class Player
{
    public:
        Player(RawServer *server, std::string path, Vector *position);

        void set();

        RawServer *server;
        std::string path;
        Vector *position;
};

class MultiplayerServer : public RawServer
{
    public:
        MultiplayerServer(std::string url, std::string auth);

    private:
        std::string auth;
        std::string url;


};
#pragma once

#include <string>


class RawServer
{
    public:
        RawServer(std::string url, std::string auth);
        ~RawServer();

        std::string get(std::string path);
        std::string set(std::string path, std::string value);
        std::string del(std::string path);

        std::string data();

        std::string save();
        std::string load();

    private:
        std::string auth;
        std::string url;
};

class NetworkObject
{
    public:
        NetworkObject(RawServer *server, std::string path, std::string *data);
        ~NetworkObject();

        void set();

        std::string path;
        std::string *data;
        RawServer *server;
};
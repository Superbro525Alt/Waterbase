#include "../include/raw.h"
#include "../include/requests.h"

#include <cpr/cpr.h>



RawServer::RawServer(std::string url, std::string auth)
{
    this->url = url;
    this->auth = auth;
}

RawServer::~RawServer()
{

}

std::string RawServer::get(std::string path)
{
    std::map<std::string, std::string> parameters = {
            { "path", path },
            { "token", auth }
    };

    std::string query = complete_url(url + "/get", parameters);

    return GET(query);
}

std::string RawServer::set(std::string path, std::string value)
{
    std::map<std::string, std::string> parameters = {
            { "path", path },
            { "value", value },
            { "token", auth }
    };

    std::string query = complete_url(url + "/set", parameters);

    return PUT(query);
}

std::string RawServer::del(std::string path)
{
    std::map<std::string, std::string> parameters = {
            { "path", path },
            { "token", auth }
    };

    std::string query = complete_url(url + "/delete", parameters);

    return DEL(query);
}

std::string RawServer::data()
{
    std::map<std::string, std::string> parameters = {
            { "token", auth }
    };

    std::string query = complete_url(url + "/data", parameters);

    return GET(query);
}

std::string RawServer::save()
{
    std::map<std::string, std::string> parameters = {
            { "token", auth }
    };

    std::string query = complete_url(url + "/save_to_file", parameters);

    return POST(query);
}

std::string RawServer::load()
{
    std::map<std::string, std::string> parameters = {
            { "token", auth }
    };

    std::string query = complete_url(url + "/load_from_file", parameters);

    return POST(query);
}

NetworkObject::NetworkObject(RawServer *server, std::string path, std::string *data)
{
    this->server = server;
    this->path = path;
    this->data = data;
}

NetworkObject::~NetworkObject()
{

}

void NetworkObject::set()
{
    server->set(path, *data);
}

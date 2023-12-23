#include "../include/multiplayer.h"
#include "../include/raw.h"

Player::Player(RawServer *server, std::string path, Vector *position) {
    this->server = server;
    this->path = path;
    this->position = position;

    this->set();
}

void Player::set() {
    this->server->set(this->path, std::to_string(this->position->x) + "," + std::to_string(this->position->y) + "," + std::to_string(this->position->z));
}

Vector::Vector(float x, float y, float z) {
    this->x = x;
    this->y = y;
    this->z = z;
}


MultiplayerServer::MultiplayerServer(std::string url, std::string auth) : RawServer(url, auth) {
    this->url = url;
    this->auth = auth;
}


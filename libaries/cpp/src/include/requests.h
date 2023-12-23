#pragma once

#include <string>
#include <cpr/cpr.h>
#include <vector>
#include <map>

std::string GET(std::string url);
std::string POST(std::string url);
std::string PUT(std::string url);
std::string DEL(std::string url);

std::string params(std::vector<std::map<std::string, std::string>> _params);
std::string complete_url(std::string url, std::map<std::string, std::string> _params);

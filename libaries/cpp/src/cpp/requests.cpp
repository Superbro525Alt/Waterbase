#include "../include/requests.h"


std::string GET(std::string url)
{
    cpr::Response r = cpr::Get(cpr::Url{url});
    return r.text;
}

std::string POST(std::string url)
{
    cpr::Response r = cpr::Post(cpr::Url{url});
    return r.text;
}

std::string PUT(std::string url)
{
    cpr::Response r = cpr::Put(cpr::Url{url});
    return r.text;
}

std::string DEL(std::string url)
{
    cpr::Response r = cpr::Delete(cpr::Url{url});
    return r.text;
}

std::string params(std::map<std::string, std::string> _params)
{
    std::string result = "";
    for (auto const& x : _params)
    {
        result += x.first + "=" + x.second + "&";
    }
    return result;
}

std::string complete_url(std::string url, std::map<std::string, std::string> _params)
{
    return url + "?" + params(_params);
}
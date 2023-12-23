use anyhow::{anyhow, Result};
use reqwest::blocking::Client;
use reqwest::header::CONTENT_TYPE;
use std::collections::HashMap;

pub struct RawServer {
    pub url: String,
    pub auth: String,
}
impl RawServer {
    fn complete_url(&self, path: &str, parameters: HashMap<&str, &str>) -> String {
        let mut url = format!("{}{}", self.url, path);
        // remove any trailing slashes
        url = url.trim_end_matches('/').to_string();
        if !parameters.is_empty() {
            url.push_str("?");
            for (key, value) in parameters {
                url.push_str(&format!("{}={}&", key, value));
            }
        }
        // chop off the last character, which is always an extra &
        url.pop();
        url
    }

    pub fn make_request(
        &self,
        method: &str,
        path: &str,
        parameters: HashMap<&str, &str>,
    ) -> Result<String> {
        let url = self.complete_url(path, parameters);

        let client = Client::new();
        let request = match method {
            "GET" => client.get(&url),
            "PUT" => client.put(&url),
            "DELETE" => client.delete(&url),
            "POST" => client.post(&url),
            _ => return Err(anyhow!("Invalid HTTP method")),
        };

        let response = request.header(CONTENT_TYPE, "application/json").send()?;
        Ok(response.text()?)
    }

    pub fn get(&self, path: &str) -> Result<String> {
        let mut parameters = HashMap::new();
        parameters.insert("path", path);
        parameters.insert("token", &*self.auth);
        self.make_request("GET", path, parameters)
    }

    pub fn set(&self, path: &str, value: &str) -> Result<String> {
        let mut parameters = HashMap::new();
        parameters.insert("path", path);
        parameters.insert("value", value);
        parameters.insert("token", &*self.auth);
        self.make_request("PUT", path, parameters)
    }

    pub fn del(&self, path: &str) -> Result<String> {
        let mut parameters = HashMap::new();
        parameters.insert("path", path);
        parameters.insert("token", &*self.auth);

        self.make_request("DELETE", path, parameters)
    }

    pub fn data(&self) -> Result<String> {
        let mut parameters = HashMap::new();
        parameters.insert("token", &*self.auth);
        self.make_request("GET", "/data", parameters)
    }

    pub fn save(&self) -> Result<String> {
        let mut parameters = HashMap::new();
        parameters.insert("token", &*self.auth);

        self.make_request("POST", "/save_to_file", parameters)
    }

    pub fn load(&self) -> Result<String> {
        let mut parameters = HashMap::new();
        parameters.insert("token", &*self.auth);

        self.make_request("POST", "/load_from_file", parameters)
    }
}

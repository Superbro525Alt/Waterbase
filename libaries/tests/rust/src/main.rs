//use the waterbase dep
use waterbase::RawServer;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let raw_server = RawServer {
        url: "http://localhost:3000".to_string(),
        auth: "test".to_string(),
    };

    let data = raw_server.data()?;
    println!("Data: {:?}", data);

    // Add similar calls for other functions as needed

    Ok(())
}
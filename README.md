![alt text](git_resources/logo.png)
> React.js (Chakra UI) + Redux, server Rust + Actix
# BLUEPRINT
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **_NOTE:_**  Temporary hosting on AWS with HTTP only (no TLS).

Basic e-commerce with registering system, cart and ordering system. Currently hosted on Amazon Web Services.

## Getting started

- Download repo and `cd e-commerce`
- Build React
```bash
cd frontend
npm install
npm run build
```
- Compile and run server
> NOTE: by default server runs on localhost:4040
```bash
RUST_LOG=info
cd ../backend-rust
cargo build --release
cargo run --release
```

## Screenshots
A few screenshots of app.

> Home Page
![alt text](git_resources/sc01.png)

> Product page view
![alt text](git_resources/sc02.png)

> Cart details page
![alt text](git_resources/sc03.png)

> Register page
![alt text](git_resources/sc04.png)

> Products list page
![alt text](git_resources/sc05.png)

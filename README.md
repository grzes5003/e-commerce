# e-commerce
> React.js (Chakra UI) + Redux, server Rust + Actix

Basic e-commerce with registering system, cart and ordering system.

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

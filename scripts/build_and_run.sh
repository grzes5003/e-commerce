if pidof -x "target/release/backend-rust" > /dev/null; then
    echo "Process already running -> exiting"

fi

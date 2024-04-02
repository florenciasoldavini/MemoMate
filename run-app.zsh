#!/bin/bash

# Check if the script is run as root
if [ "$EUID" -ne 0 ]
 then echo "Please run as root"
 exit
fi

# Update packages and install dependencies
echo "Updating packages and installing dependencies..."
apt-get update -y
apt-get install -y nodejs npm postgresql postgresql-contrib

read -p "Enter PostgreSQL username: " DB_USER
read -s -p "Enter PostgreSQL password: " DB_PASSWORD
echo

# Set up PostgreSQL database
echo "Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE memomate;"
sudo -u postgres psql -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASSWORD';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE memomate TO $DB_USER;"

# Create .env file in the backend directory
echo "Creating .env file in the backend directory..."
cat > backend/.env << EOL
# Database
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
PORT=3001
DB_NAME=memomate
DB_HOST=localhost:5432

# Jwt
JWT_SECRET=mySecretKey
EOL

# Function to start the backend
start_backend() {
    echo "Starting backend..."
    cd backend
    npm install
    npm run setup-db # Assuming you have a script named 'setup-db' in your backend's package.json
    npm start &
    cd ..
}

# Function to start the frontend
start_frontend() {
    echo "Starting frontend..."
    cd frontend
    npm install
    npm start &
    cd ..
}

# Start both backend and frontend
start_backend
start_frontend

echo "Both backend and frontend are now running."

# Run the app
echo "Starting the app..."
npm start

# Gunakan Node.js versi LTS ringan
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Expose port sesuai .env
EXPOSE 5000

# Jalankan server
CMD ["npm", "run", "start"]

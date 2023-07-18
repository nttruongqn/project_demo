# Sử dụng một base image Node.js
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies của ứng dụng
RUN npm install

# Sao chép các file source code vào thư mục làm việc
COPY . .

# Build ứng dụng NestJS
RUN npm run build


# Thiết lập cổng mà ứng dụng sẽ lắng nghe
EXPOSE 1308

# Chạy ứng dụng khi container được khởi chạy
CMD [ "npm", "run", "start:prod" ]
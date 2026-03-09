# ---------------------------
# 🧱 Stage 1: Build React app
# ---------------------------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài dependencies
RUN npm ci

# Copy toàn bộ source vào container
COPY . .

# Build production (tạo thư mục build/)
RUN npm run build

# ----------------------------
# 🚀 Stage 2: Serve với Nginx
# ----------------------------
FROM nginx:alpine

# Copy file build từ stage 1 sang Nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình Nginx tùy chọn (nếu bạn có)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
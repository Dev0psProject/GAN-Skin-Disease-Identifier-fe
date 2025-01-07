# stages frontend
FROM node:19-alpine AS frontend

# Install git
RUN apk add git

# Buat working directory
WORKDIR /frontend

# Clone hanya branch frontend dari repository
RUN git clone -b frontend https://github.com/mhdusop/GAN-Skin-Disease-Identifier.git .

# Install dependencies dan build aplikasi frontend
RUN npm install
RUN npm run build

# Production stage menggunakan Nginx untuk menyajikan hasil build frontend
FROM nginx:1.21-alpine AS production

# Copy hasil build ke direktori html nginx
COPY --from=frontend /frontend/dist /usr/share/nginx/html

# Expose port 80 untuk frontend
EXPOSE 80

# Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
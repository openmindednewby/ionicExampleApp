# Stage 1: Build the Ionic app
FROM node:18 AS build
LABEL author="Jimmy Walker"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/www /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Stage 3 docker build -t ionic-example-app .
# Stage 4 docker run -dp 4299:80 --name ionicExampleApp -network=internal-docker --ip=172.18.0.2 ionic-example-app

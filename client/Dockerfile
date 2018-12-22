FROM node:alpine as builder
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
# npm run build will expose a build folder; copy that folder into nginx phase of build
RUN npm run build 

FROM nginx
# nginx is going to serve client on port 3000
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
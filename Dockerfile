FROM docker.io/nginx:alpine

RUN apk add --no-cache nodejs-current npm

COPY . /tmp/pres

WORKDIR /tmp/pres

RUN npm install --omit=dev && npm run build

RUN mkdir -p /var/www && cp -r public/* /var/www

RUN rm /etc/nginx/conf.d/default.conf && \
    cp configs/dev/pres_nginx.conf /etc/nginx/conf.d/

WORKDIR /var/www

RUN rm -rf /tmp/pres && \
    apk del nodejs-current npm 

EXPOSE 80

VOLUME [ "/etc/nginx/conf.d/", "/var/www/configs", "/var/www/assets"]

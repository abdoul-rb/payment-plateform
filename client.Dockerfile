FROM node:alpine3.10

# For jest and puppeteer
RUN apk add chromium 
RUN npm i -g serve
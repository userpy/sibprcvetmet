FROM node:12.18.1
WORKDIR /server
COPY . .
COPY package.json .
RUN npm install
EXPOSE 3000
CMD ["npm","run","express"]








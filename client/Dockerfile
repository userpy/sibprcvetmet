FROM node:12.18.1
WORKDIR /client
COPY . .
COPY package.json .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "build"]
CMD ["npm","run","serve"]







#Download base image node
FROM node:carbon
 #Create app directory
 WORKDIR /usr/src/main-app

 #Install app dependencies
 COPY package*.json ./


 #Copy source code
 COPY . .

 #Expose port and start application
 EXPOSE 8080
 CMD ["npm", "start"]
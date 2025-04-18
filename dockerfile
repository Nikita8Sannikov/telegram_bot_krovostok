FROM node:18-alpine
RUN apk add --no-cache ffmpeg && \
    ln -s /usr/bin/ffmpeg /usr/local/bin/ffmpeg && \
    ln -s /usr/bin/ffprobe /usr/local/bin/ffprobe
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ffmpeg -version && which ffmpeg
CMD ["npm", "start"]

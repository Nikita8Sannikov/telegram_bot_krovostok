FROM node:18-alpine
# 1. Устанавливаем FFmpeg и создаём симлинки
RUN apk add --no-cache ffmpeg && \
    ln -s /usr/bin/ffmpeg /usr/local/bin/ffmpeg && \
    ln -s /usr/bin/ffprobe /usr/local/bin/ffprobe
# 2. Проверяем установку
RUN ffmpeg -version && which ffmpeg

WORKDIR /app
# 3. Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install --include=dev && \
    npm run build && \
    npm prune --omit=dev

COPY . .
# 5. Явно указываем команду запуска
CMD ["node", "dist/index.js"]

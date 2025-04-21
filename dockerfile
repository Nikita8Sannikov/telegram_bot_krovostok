FROM node:18-alpine

# Установка FFmpeg
RUN apk add --no-cache ffmpeg && \
    ln -s /usr/bin/ffmpeg /usr/local/bin/ffmpeg

# Создаем и настраиваем рабочую директорию
WORKDIR /app

# 1. Копируем только lock-файлы (если есть) и package.json
COPY package*.json ./

# 2. Ставим зависимости и собираем проект
RUN npm install && npm run build

# 3. Проверяем что собралось
RUN ls -la dist/

# 4. Копируем ВСЕ файлы проекта
COPY . .

# 5. Запускаем
CMD ["node", "dist/index.js"]
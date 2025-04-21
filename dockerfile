FROM node:18-alpine

# Установка FFmpeg
RUN apk add --no-cache ffmpeg && \
    ln -s /usr/bin/ffmpeg /usr/local/bin/ffmpeg

# Создаем и настраиваем рабочую директорию
WORKDIR /app

# 1. Копируем только lock-файлы (если есть) и package.json
COPY package*.json ./

# 2. Устанавливаем зависимости
RUN npm install

# 3. Копируем ВСЕ файлы проекта
COPY . .

# 4. Собираем проект
RUN npm run build

# 5. Проверяем что файлы на месте
RUN ls -la dist/

# 6. Запускаем
CMD ["node", "dist/index.js"]
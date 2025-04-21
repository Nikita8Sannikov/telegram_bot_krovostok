import { Telegraf } from 'telegraf';
import ffmpeg from 'fluent-ffmpeg';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { randProf } from './utils/utils';

// Проверка FFmpeg
console.log('FFmpeg path:', ffmpegPath);
ffmpeg.setFfmpegPath(ffmpegPath);  // Используем путь из @ffmpeg-installer

// Дополнительная проверка
import { execSync } from 'child_process';
console.log('System FFmpeg:', execSync('which ffmpeg').toString());

dotenv.config();
const API_KEY = process.env.TELEGRAM_BOT_TOKEN;

if (!API_KEY) {
    console.error('Ошибка: Переменная окружения TELEGRAM_BOT_TOKEN не найдена.');
    process.exit(1); 
  }

const bot = new Telegraf(API_KEY as string);

bot.start((ctx) => ctx.reply('Привет, я твой бот! Детей нахуй, стариков в пизду, остальных в изоляторы.'));

bot.command('prof', (ctx) => {
    ctx.reply(randProf());
});

// Обработчик голосовых сообщений
bot.on('voice', async (ctx) => {
    try {
        const voiceFileId = ctx.message.voice.file_id;
        const voiceDuration = ctx.message.voice.duration; // Длительность голосового сообщения
        console.log('Длительность голосового сообщения:', voiceDuration, 'секунд');
        // Получаем ссылку на файл
        const fileLink = await ctx.telegram.getFileLink(voiceFileId);

        // Скачиваем голосовое сообщение
        const inputPath = path.resolve('input.ogg');
        const outputPath = path.resolve('output.ogg');
        const minusPath = path.resolve('./minus/Кровосток - Биография (minus).mp3');

        const response = await axios.get(fileLink.href, { responseType: 'stream' });
        const writer = fs.createWriteStream(inputPath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        console.log('Файл успешно скачан и сохранен как input.ogg');

        // Объединяем голосовое сообщение с "минусом" и регулируем громкость
        ffmpeg(inputPath)
            .input(minusPath) // Минус
            .complexFilter([
                '[1:a]volume=0.5[minus];[0:a][minus]amix=inputs=2:duration=first:dropout_transition=3[a]'
            ])
            .outputOptions([
                '-map [a]',           // Использовать смешанный трек
                '-c:a libopus',       // Аудиокодек libopus
                '-b:a 128k',          // Битрейт
                '-ar 48000',          // Частота дискретизации 48kHz (рекомендуется для Telegram)
                '-ac 2'               // Стерео
            ])
            .save(outputPath)
            .on('end', async () => {
                console.log('FFmpeg завершил обработку файла.');
                // Отправляем обработанный файл как голосовое сообщение

                await ctx.replyWithVoice(
                    { source: outputPath },
                );

                // Удаляем временные файлы
                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);

            })
            .on('error', (err) => {
                console.error('Ошибка при обработке файла с FFmpeg:', err);
                ctx.reply('Произошла ошибка при обработке голосового сообщения.');
            })
    } catch (err) {
        console.error('Ошибка при обработке голосового сообщения:', err);
        ctx.reply('Произошла ошибка при обработке голосового сообщения.');
    }
});

bot.launch();
console.log('Bot is running...');

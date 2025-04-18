function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
}

const prof = [
    "Нервным программистом",
    "Ушлым коммивояжером",
    "Цепким менеджером",
    "Скучным веб-дизайнером",
    "Крупным акционером",
    "Мелким лавочником",
    "Трепетным сектантом",
    "Глупым политтехнологом",
    "Продвинутым рекламщиком",
    "Продажным журналистом",
    "Весёлым интерьерщиком",
    "Лучшим инструктором",
    "Средненьким телевизионщиком",
    "Нормальным методистом",
    "Плохим агентом",
    "Хорошим дилером",
    "Глубинным психологом",
    "Дорогим диетологом",
    "Взвешенным социологом",
    "Доёбистым юристом",
    "Вязким переговорщиком",
    "Криминальным нотариусом",
    "Отвязным консультантом",
    "Резвым синхронистом",
    "Мудрым советником",
    "Мелированным модельером",
    "Цепким банкиром",
    "Продуманным антикварщиком",
    "Неприметным брокером",
    "Гламурным фоторедактором",
    "Негодяем-промоутером",
    "Лужковским архитектором",
    "Извращённым преподавателем",
    "Садистом-стоматологом",
    "Умелым управляющим",
    "Успешным издателем",
    "Исполнительным продюсером",
    "Коррумпированным чиновником",
    "Тихим трейдером",
    "Истеричным стилистом",
    "генеральным директором",
    "Основным инвестором",
    "Улыбчивым ресторатором",
    "Системным аналитиком",
    "теневым бухгалтером"
]

export const randProf = () => prof[randomInteger(0, prof.length - 1)]


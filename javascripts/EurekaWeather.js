/**
 * エリアの定義
 */
export const ZONE_EUREKA_ANEMOS = 'eurekaAnemos';
export const ZONE_EUREKA_PAGOS = 'eurekaPagos';
export const ZONE_EUREKA_PYROS = 'eurekaPyros';
export const ZONE_EUREKA_HYDATOS = 'eurekaHydatos';

/**
 * 天気の定義
 */
export const WEATHER_BLIZZARDS = 'blizzards';
export const WEATHER_FAIR_SKIES = 'fairSkies';
export const WEATHER_FOG = 'fog';
export const WEATHER_GALES = 'gales';
export const WEATHER_GLOOM = 'gloom';
export const WEATHER_HEAT_WAVES = 'heatWaves';
export const WEATHER_SHOWERS = 'showers';
export const WEATHER_SNOW = 'snow';
export const WEATHER_THUNDER = 'thunder';
export const WEATHER_THUNDERSTORMS = 'thunderstorms';
export const WEATHER_UMBRAL_WIND = 'umbralWind';

/**
 * chance計算
 */
function calculateForecastTarget(date) {
    const unixtime = Math.floor(date.getTime() / 1000);
    // Get Eorzea hour for weather start
    const bell = unixtime / 175;

    // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
    const increment = (bell + 8 - (bell % 8)) % 24;

    // Take Eorzea days since unix epoch
    let totalDays = unixtime / 4200;
    totalDays = (totalDays << 32) >>> 0; // eslint-disable-line no-bitwise

    const calcBase = totalDays * 0x64 + increment;

    /* eslint-disable no-bitwise */
    const step1 = ((calcBase << 0xb) ^ calcBase) >>> 0;
    const step2 = ((step1 >>> 8) ^ step1) >>> 0;
    /* eslint-enable no-bitwise */

    return step2 % 0x64;
};

/**
 * アネモス
 */
const eurekaAnemos = function (chance) {
    if (chance < 30) {
        return WEATHER_FAIR_SKIES;
    }
    if (chance < 60) {
        return WEATHER_GALES;
    }
    if (chance < 90) {
        return WEATHER_SHOWERS;
    }
    return WEATHER_SNOW;
};

/**
 * パゴス
 */
const eurekaPagos = function (chance) {
    if (chance < 10) {
        return WEATHER_FAIR_SKIES;
    }
    if (chance < 28) {
        return WEATHER_FOG;
    }
    if (chance < 46) {
        return WEATHER_HEAT_WAVES;
    }
    if (chance < 64) {
        return WEATHER_SNOW;
    }
    if (chance < 82) {
        return WEATHER_THUNDER;
    }
    return WEATHER_BLIZZARDS;
};

/**
 * ピューロス
 */
const eurekaPyros = function (chance) {
    if (chance < 10) {
        return WEATHER_FAIR_SKIES;
    }
    if (chance < 28) {
        return WEATHER_HEAT_WAVES;
    }
    if (chance < 46) {
        return WEATHER_THUNDER;
    }
    if (chance < 64) {
        return WEATHER_BLIZZARDS;
    }
    if (chance < 82) {
        return WEATHER_UMBRAL_WIND;
    }
    return WEATHER_SNOW;
};

/**
 * ヒュダトス
 */
const eurekaHydatos = function (chance) {
    if (chance < 12) {
        return WEATHER_FAIR_SKIES;
    }
    if (chance < 34) {
        return WEATHER_SHOWERS;
    }
    if (chance < 56) {
        return WEATHER_GLOOM;
    }
    if (chance < 78) {
        return WEATHER_THUNDERSTORMS;
    }
    return WEATHER_SNOW;
};

export const localeJa = {
    'weathers.blizzards': '吹雪',
    'weathers.fairSkies': '晴れ',
    'weathers.fog': '霧',
    'weathers.gales': '暴風',
    'weathers.gloom': '妖霧',
    'weathers.heatWaves': '灼熱波',
    'weathers.showers': '暴雨',
    'weathers.snow': '雪',
    'weathers.thunder': '雷',
    'weathers.thunderstorms': '雷雨',
    'weathers.umbralWind': '霊風',
    'zones.eurekaAnemos': 'エウレカ：アネモス帯',
    'zones.eurekaHydatos': 'エウレカ：ヒュダトス帯',
    'zones.eurekaPagos': 'エウレカ：パゴス帯',
    'zones.eurekaPyros': 'エウレカ：ピューロス帯',

};
const chances = {};
chances[ZONE_EUREKA_ANEMOS] = eurekaAnemos;
chances[ZONE_EUREKA_PAGOS] = eurekaPagos;
chances[ZONE_EUREKA_PYROS] = eurekaPyros;
chances[ZONE_EUREKA_HYDATOS] = eurekaHydatos;

export class EurekaWeather {
    id;
    constructor(id) {
        this.id = id;
    }
    getWeather(_date) {
        const chance = calculateForecastTarget(_date);
        const weatherId = chances[this.id](chance);
        return localeJa["weathers." + weatherId];
    }

    static getWeather(_id, _date) {
        return new EurekaWeather(_id).getWeather(_date);
    }
} 
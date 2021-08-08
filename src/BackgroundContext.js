import { createContext } from "react";

const backgrounds = {
    Clear: ".bgClear",
    Clouds: ".bgClouds",
    Mist: ".bgMist",
    Rain: ".bgRain",
    Drizzle: ".bgDrizzle",
    Snow: ".bgSnow",
    Thunderstorm: ".bgThunderstorm"
};

export const BackgroundContext = createContext(backgrounds.Clear);
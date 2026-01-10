import en from "../../locales/en.json";

type LocaleData = typeof en;

export function getDictionary() {
    return en;
}

export type TDictionary = LocaleData;

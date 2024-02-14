import { parse as yamlParse } from "yaml";

export const getValue = (obj: any, key: string): any => {
  const currentKey = key.split(".")[0];
  const otherKeys = key.substring(currentKey.length + 1);
  return currentKey
    ? obj[currentKey]
      ? getValue(obj[currentKey], otherKeys)
      : obj[currentKey]
    : obj;
};

export const parseToObject = (rawText: string, language: Language) => {
  switch (language) {
    case "json":
    case "js":
      return JSON.parse(rawText);
    case "yml":
    case "yaml":
      return yamlParse(rawText);
    default:
      return {};
  }
};

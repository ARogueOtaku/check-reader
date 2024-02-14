import { configs, accessToken } from "./config";
import { getValue, parseToObject } from "./utils";

const fetchHeaders = new Headers();
fetchHeaders.set("Accept", "application/vnd.github.raw+json");
fetchHeaders.set("Authorization", `Bearer ${accessToken}`);

const getOutput = async () => {
  const configPromises = configs.map((config) =>
    fetch(config.url, {
      headers: fetchHeaders,
    }).then((res) => {
      if (res.ok) return res.text();
      return Promise.reject(`Error ${res.status}, ${res.statusText}`);
    })
  );
  const configResponses = await Promise.allSettled(configPromises);
  const outputs: ExtractedOutput[] = [];
  configResponses.forEach((response, i) => {
    try {
      if (response.status === "fulfilled") {
        const parsedObj = parseToObject(response.value, configs[i].language);
        const value = getValue(parsedObj, configs[i].extractKey);
        outputs.push({
          status: "success",
          label: configs[i].label ?? configs[i].extractKey,
          value,
        });
      } else throw new Error(response.reason);
    } catch (e: any) {
      outputs.push({
        status: "error",
        label: configs[i].label ?? configs[i].extractKey,
        message: e.message,
      });
    }
  });
  return outputs;
};

console.log(await getOutput());

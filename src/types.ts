type Language = "yml" | "yaml" | "json" | "js";

type Config = {
  url: string;
  language: Language;
  extractKey: string;
  label?: string;
};

type ExtractedOutput =
  | {
      status: "error";
      label: string;
      message: string;
    }
  | {
      status: "success";
      label: string;
      value: any;
    };

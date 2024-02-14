import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "khujli",
      formats: ["es"],
    },
    outDir: "check-reader",
    minify: false,
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          console.log(id);
          if (id.includes("src/config.ts")) {
            return "config";
          }
          if (id.includes("node_modules")) {
            return "dependencies";
          }
          return "main";
        },
        chunkFileNames: "[name].js",
      },
    },
  },
});

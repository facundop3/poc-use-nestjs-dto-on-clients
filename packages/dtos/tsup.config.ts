import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: true,
  target: "node14",
  plugins: [
    {
      name: "class-transformer/storage",
    },
  ],
});

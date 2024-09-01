import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "BaiStream",
    favicon: "./src/favicon-32x32.png",
    meta: {
      description:
        "Share videos with sound on Google Meet with ease. Our website allows you to play local videos and share them seamlessly during your calls.",
    },
  },
});

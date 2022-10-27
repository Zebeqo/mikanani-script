import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        version: "1.0.0",
        icon: "https://mikanani.me/images/favicon.ico",
        namespace: "https://github.com/Zebeqo/",
        match: ["https://mikanani.me/Home/Bangumi/*"],
        name: {
          "": "蜜柑计划|mikanani|Mikan Project|批量复制磁力链接",
          zh: "蜜柑计划|mikanani|Mikan Project|批量复制磁力链接",
          en: "mikanani|Mikan Project|Multi-selector",
        },
        author: "Zebeqo",
        description: {
          "": "为详情页，如 https://mikanani.me/Home/Bangumi/2841，提供复选框批量复制磁力链接功能",
          zh: "为详情页，如 https://mikanani.me/Home/Bangumi/2841，提供复选框批量复制磁力链接功能",
          en: "For detail pages, such as https://mikanani.me/Home/Bangumi/2841, provide checkboxes to batch copy magnet links.",
        },
        updateURL:
          "https://raw.githubusercontent.com/Zebeqo/mikanani-script/master/dist/mikanani-script.user.js",
        downloadURL:
          "https://raw.githubusercontent.com/Zebeqo/mikanani-script/master/dist/mikanani-script.user.js",
        supportURL: "https://github.com/Zebeqo/mikanani-script/issues",
      },
    }),
  ],
});

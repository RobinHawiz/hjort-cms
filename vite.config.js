import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import checker from "vite-plugin-checker";

const base = "/hjort-cms/";
const root = "src/pages";
const publicDir = "../assets";
const outDir = "../../dist";

export default defineConfig(({ mode }) => {
  // Load env manually from the actual project root
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base,
    root,
    publicDir,
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          login: resolve(__dirname, root, "index.html"),
          reservations: resolve(__dirname, root, "bokningar", "index.html"),
          editMenu: resolve(__dirname, root, "redigera-meny", "index.html"),
        },
        output: {
          entryFileNames: "js/[name]-[hash].js",
          chunkFileNames: "js/[name]-[hash].js",
          assetFileNames: "styles/[name]-[hash][extname]",
        },
      },
    },
    server: {
      open: true,
    },
    resolve: {
      alias: {
        "@assets": resolve(__dirname, "src/assets"),
        "@ts": resolve(__dirname, "src/ts"),
        "@styles": resolve(__dirname, "src/styles"),
      },
    },
    plugins: [
      checker({
        typescript: true,
      }),
    ],
    define: {
      // Inject env variables into frontend
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
        env.VITE_API_BASE_URL
      ),
    },
  };
});

const path = require("path");

// ---------------------------------------------------------------------------------------
//                             path 设置
// ----------------------------------------------------------------------------------------
const buildPath = path.resolve(__dirname, "../build");
const publicPath = "/";
const sourcePath = path.resolve(__dirname, "../src");
const node_modules_path = path.resolve(__dirname, "../node_modules");
const indexHtmlPath = path.resolve(__dirname, "../public/index.html");

// ---------------------------------------------------------------------------------------
//                             alias 设置
// ----------------------------------------------------------------------------------------
const pathAlias = {
    // 备注:对于ts，alias映射除了在这里设置,在tsconfig.json的paths字段也需要设置
    "@": path.resolve(__dirname, "../src/") // 以 @ 表示src目录
};

// ------------------------------------------------------------------------------------------
//                             dev Server端口设置
// ------------------------------------------------------------------------------------------
const serverPort = 8180;

// --------------------------------------------------end----------------------------------------------------------
module.exports = {
    sourcePath: sourcePath,
    buildPath: buildPath,
    publicPath: publicPath,
    node_modules_path: node_modules_path,
    indexHtmlPath: indexHtmlPath,

    pathAlias: pathAlias,

    serverPort: serverPort
};

// const { override, fixBabelImports, addLessLoader } = require('customize-cra');
// module.exports = override(
//     fixBabelImports('import', {
//         libraryName: 'antd',
//         libraryDirectory: 'es',
//         style: true,
//     }),
//     addLessLoader({
//         javascriptEnabled: true,
//         modifyVars: { '@primary-color': 'red' },
//     }),
// );

const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');
// const { resolve } = require("path");
module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': 'blue' },
    })
    // addWebpackAlias({
    //     '@': resolve('src')
    // })
);
module.exports = {
    present: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\>tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
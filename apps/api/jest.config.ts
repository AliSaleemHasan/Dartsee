import { nestConfig } from '@repo/jest-config';

export default {
    ...nestConfig,
    coveragePathIgnorePatterns: ['/node_modules/', '/generated/'],
    moduleNameMapper: {
        '^@repo/prisma(.*)$': '<rootDir>/../test/prisma.mock.ts',
    },
};

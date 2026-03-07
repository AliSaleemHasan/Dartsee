import { nestConfig } from '@repo/jest-config';

export default {
    ...nestConfig,
    coveragePathIgnorePatterns: ['/node_modules/', '/generated/'],
};

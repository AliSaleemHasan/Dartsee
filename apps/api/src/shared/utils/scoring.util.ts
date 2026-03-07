import { Throw } from '@repo/prisma';

/**
 * Calculates the score of a single throw based on its multiplier/modifier.
 */
export const calculateThrowScore = (t: Pick<Throw, 'score' | 'modifier'>): number => {
    return (t.score || 0) * (t.modifier || 0);
};

/**
 * Formats a single throw into its string representation (e.g. T20, D16, Miss, 20).
 */
export const formatThrow = (t: Pick<Throw, 'score' | 'modifier'>): string => {
    if (t.modifier === 0) return 'Miss';
    if (t.modifier === 3) return `T${t.score}`;
    if (t.modifier === 2) return `D${t.score}`;
    return `${t.score}`;
};

/**
 * Helper to split an array into smaller chunks of a specific size.
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
        array.slice(i * size, i * size + size),
    );
}

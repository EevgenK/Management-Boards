import crypto from 'crypto';
/**
 * Generates a 10-character SHA-256 hash ID from a given input string.
 * The input is trimmed and converted to lowercase before hashing.
 *
 * @param inputId - The input string to hash.
 * @returns A 10-character hexadecimal hash.
 */
export const generateHashId = (inputId) => {
    const trimmedId = inputId.trim().toLowerCase();
    const salt = crypto.randomBytes(16).toString('hex');
    return crypto
        .createHash('sha256')
        .update(trimmedId + salt)
        .digest('hex')
        .slice(0, 12);
};

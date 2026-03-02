/**
 * KMS (Key Management Service) integration for production wallet management.
 *
 * In development, keys are stored in Redis (see services/payments/wallets.ts).
 * In production, this module provides the same interface backed by:
 *   - AWS KMS / CloudHSM
 *   - GCP Cloud KMS
 *   - HashiCorp Vault
 *
 * IMPORTANT: Never store raw private keys in Redis/DB in production.
 * This module wraps keys in KMS envelopes — the plaintext key never
 * leaves the KMS boundary.
 */
export interface KmsConfig {
    provider: 'aws' | 'gcp' | 'vault' | 'none';
    keyId: string;
    region?: string;
    endpoint?: string;
}
/**
 * Encrypt a private key for storage.
 * Returns base64-encoded ciphertext.
 */
export declare function encryptKey(plaintext: string): Promise<string>;
/**
 * Decrypt a private key from storage.
 * Returns plaintext private key.
 */
export declare function decryptKey(ciphertext: string): Promise<string>;
/**
 * Check if KMS is configured for production use.
 */
export declare function isKmsConfigured(): boolean;
/**
 * Rotate the KMS wrapping key.
 * The actual key material doesn't change — only the envelope is re-encrypted.
 */
export declare function rotateWrappingKey(): Promise<void>;
//# sourceMappingURL=kms.d.ts.map
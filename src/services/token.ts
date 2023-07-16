import * as storage from "../utils/storage";

import { ACCESS_TOKEN } from "../constants/storage";

/**
 * Persist token to storage.
 *
 * @param {string} accessToken
 */
export function persist(accessToken: string) {
  storage.set(ACCESS_TOKEN, accessToken);
}

/**
 * Get access token from storage.
 *
 * @returns {string}
 */
export function getAccessToken() {
  return storage.get(ACCESS_TOKEN);
}

/**
 * Set access token from storage.
 *
 * @param {string} accessToken
 */
export function setAccessToken(accessToken: string) {
  storage.set(ACCESS_TOKEN, accessToken);
}

/**
 * Clear tokens.
 */
export function clear() {
  storage.remove(ACCESS_TOKEN);
}

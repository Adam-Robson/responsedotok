/**
 * URLs a README link rewrite must leave alone: any scheme
 * (https:, mailto:, data:), protocol-relative (//) and in-page anchors (#).
 */
export const KEPT_URL_PATTERN = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

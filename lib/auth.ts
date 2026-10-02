export function validateApiKey(request: Request): boolean {
  const configuredApiKey = process.env.PORTAL_API_KEY || "rewardly_qa_secret_key_2026";

  // Check x-api-key header
  const xApiKey = request.headers.get("x-api-key");
  if (xApiKey && xApiKey === configuredApiKey) {
    return true;
  }

  // Check Authorization: Bearer <KEY>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.substring(7).trim();
    if (bearerToken === configuredApiKey) {
      return true;
    }
  }

  return false;
}

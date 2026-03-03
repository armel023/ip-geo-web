export default function normalizeIp(ip: string | null) {
  if (!ip) return null

  // Remove IPv6-mapped prefix
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "")
  }

  return ip
}

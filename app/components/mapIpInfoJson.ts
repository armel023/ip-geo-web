import { GeoInfo } from "./IGeoInfo";

export function mapIpInfoJson(ipInfoJson: string): GeoInfo | null {
  try {
    const obj = JSON.parse(ipInfoJson);
    return {
      ip: obj.Ip || obj.ip || "",
      city: obj.City || obj.city || "",
      region: obj.Region || obj.region || "",
      country: obj.Country || obj.country || "",
      loc: obj.Loc || obj.loc || "",
      org: obj.Org || obj.org || "",
      postal: obj.Postal || obj.postal || "",
      timezone: obj.Timezone || obj.timezone || "",
    };
  } catch {
    return null;
  }
}

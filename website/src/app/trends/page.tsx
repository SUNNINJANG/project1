import { getAllTrends } from "@/lib/content";
import TrendsView from "./TrendsView";

export default function TrendsPage() {
  const trends = getAllTrends();
  return <TrendsView trends={trends} />;
}

import { categories, resources } from "@/lib/data";
import { Shell } from "@/components/Shell";

export default function Home() {
  return <Shell categories={categories} resources={resources} />;
}

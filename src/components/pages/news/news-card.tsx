import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { News } from "@/types";

const NewsCard = ({ item }: { item: News }) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <Link href={`/news/${item.id}`}>
      <Card className="h-full border-none p-0 text-cyan-950 bg-transparent group overflow-hidden">
        <CardHeader className="p-0 overflow-hidden rounded-2xl aspect-16/10 relative">
          <img
            src={item.image}
            alt={item.title[locale as keyof typeof item.title]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge
            variant="secondary"
            className="text-cyan-950/60 absolute top-5 start-5 backdrop-blur-md bg-white/50 border-none"
          >
            {t("Articles")}
          </Badge>
        </CardHeader>
        <CardContent className="px-0 py-5 space-y-3">
          <p className="text-sm text-cyan-950/40">
            {moment(item.created_at).locale(locale).format("DD MMMM YYYY")}
          </p>
          <h3 className="text-xl font-medium line-clamp-2 leading-8 group-hover:text-amber-700 transition-colors">
            {item.title[locale as keyof typeof item.title]}
          </h3>
          <p className="text-sm text-cyan-950/60 line-clamp-3">
            {item.description[locale as keyof typeof item.description]}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;

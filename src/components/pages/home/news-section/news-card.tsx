import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { News } from "@/types";

const NewsCard = ({ item }: { item: News }) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <Link href={`/news/${item.id}`} className="group">
      <Card className="h-full border-none p-0 text-cyan-950 bg-transparent">
        <CardHeader
          className="bg-cover bg-center rounded-2xl min-h-[30svh] relative"
          style={{
            backgroundImage: `url(${item.image})`,
          }}
        >
          <Badge
            variant="secondary"
            className="text-cyan-950/40 absolute top-5 start-5"
          >
            {t("Articles")}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-cyan-950/40">
            {moment(item.created_at).locale(locale).format("DD MMMM YYYY")}
          </p>
          <h3 className="text-xl xl:text-2xl font-medium leading-7 xl:leading-11 group-hover:text-amber-700 transition-colors">
            {item.title[locale as keyof typeof item.title]}
          </h3>
          <p className="text-sm text-cyan-950/40 line-clamp-3">
            {item.description[locale as keyof typeof item.description]}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;

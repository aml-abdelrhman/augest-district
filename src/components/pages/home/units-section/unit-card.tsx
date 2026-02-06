import React from "react";
import { Unit } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const UnitCard = ({ unit }: { unit: Unit }) => {
  const t = useTranslations();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{unit.unit_number}</CardTitle>
        <Badge variant={unit.status === "available" ? "success" : "secondary"}>
          {t(unit.status)}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>{unit.description}</p>
        <p>{unit.price}</p>
        <p>{unit.floor}</p>
        <p>{unit.area}</p>
        <p>{unit.rooms}</p>
      </CardContent>
    </Card>
  );
};

export default UnitCard;

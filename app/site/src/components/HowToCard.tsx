import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
interface HowToCardProps {
  title: string;
  description: string;
}

const HowToCard = ({ title, description }: HowToCardProps) => {
  return (
    <Card className="flex items-center flex-1 shadow-primary">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default HowToCard;

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MouseIcon, type LucideIcon } from "lucide-react";

import React from "react";

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  bool?: boolean;
}

const FeatureCard = ({ title, icon, description, bool }: FeatureCardProps) => {
  return (
    <Card className="flex-1 w-64 shadow-primary">
      <CardHeader>
        <CardTitle className="flex flex-col items-start gap-2">
          <div className="relative grid w-12 h-12 rounded-full text-secondary bg-secondary-foreground place-content-center">
            {bool && (
              <div className="absolute w-1 h-12 rotate-45 -translate-x-1/2 -translate-y-1/2 bg-destructive overflow-clip top-1/2 left-1/2"></div>
            )}
            <div dangerouslySetInnerHTML={{ __html: icon }} />
            {/* <MouseIcon className="w-9 h-9 " /> */}
            {/* {icon} */}
          </div>
          <div className="h-12 text-left line-clamp-2">{title}</div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeatureCard;

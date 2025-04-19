import React from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface NavigationCardProps {
  href: string;
  title: string;
  description: string;
  icon: string;
  borderColor: string;
  hoverColor: string;
  iconColor: string;
}

const NavigationCard = ({
  href,
  title,
  description,
  icon,
  borderColor,
  hoverColor,
  iconColor,
}: NavigationCardProps) => {
  return (
    <Link href={href}>
      <a className="block">
        <Card
          className={cn(
            "nav-card bg-card overflow-hidden border-l-4 transition-colors",
            borderColor,
            hoverColor
          )}
        >
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className={cn("mr-3 text-2xl", iconColor)}>
                <i className={icon}></i>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default NavigationCard;

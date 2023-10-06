import { Button } from "@/components/ui/button";
import { Edit3, Facebook, TrashIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const CardComponent = () => {
  return (
    <TooltipProvider>
      <Card data-id={"hello"} className="max-w-[300px] min-w-[250px]">
        <CardHeader>
          <CardTitle className="flex flex-col items-start gap-2" tabIndex={-1}>
            <Facebook className="" tabIndex={-1} />
            <Tooltip>
              <TooltipTrigger>
                <a
                  className="underline-offset-4 hover:underline"
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  Facebook
                </a>
              </TooltipTrigger>
              <TooltipContent>Facebook</TooltipContent>
            </Tooltip>
          </CardTitle>

          <Tooltip>
            <TooltipTrigger>
              <CardDescription className="text-left line-clamp-3" tabIndex={-1}>
                Log in to Facebook to start sharing and connecting with your
                friends, family and people you know. lore
              </CardDescription>
              <TooltipContent className="w-[200px]">
                Log in to Facebook to start sharing and connecting with your
                friends, family and people you know. lore
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => toast.error("deleted")}
            className="hover:bg-red-500/90 "
            size={"icon"}
          >
            <TrashIcon />
          </Button>
          <Button size={"icon"}>
            <Edit3 />
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default CardComponent;

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

const SiteCard = () => {
  return (
    <TooltipProvider>
      <Card data-id={"hello"} className="w-[300px]">
        <CardHeader>
          <Tooltip>
            <TooltipTrigger>
              <CardTitle
                className="flex flex-col items-start gap-2"
                tabIndex={0}
              >
                <Facebook className="" />

                <a
                  className="underline-offset-4 hover:underline"
                  href="https://www.facebook.com/"
                >
                  Facebook
                </a>
              </CardTitle>
              <TooltipContent>Facebook</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <CardDescription className="text-left line-clamp-3" tabIndex={0}>
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
          <Button onClick={() => toast.error("deleted")} size={"icon"}>
            <TrashIcon />
          </Button>
          <Button onClick={() => toast("editing")} size={"icon"}>
            <Edit3 />
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default SiteCard;

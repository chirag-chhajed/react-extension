import { Button } from "@/components/ui/button";
import { Edit3, TrashIcon } from "lucide-react";
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
import { deleteDoc } from "firebase/firestore";
import { getDocumentRef } from "@/background/background";

interface CardComponentProps {
  dataId: string;
  favicon: string;
  url: string;
  title: string;
  description: string;
}

const deleteingSite = async (documentId: string) => {
  try {
    await deleteDoc(getDocumentRef("sites", documentId));
    toast.success("Site deleted");
  } catch (error) {
    toast.error("Error deleting site");
    console.error(error);
  }
};

const CardComponent = ({
  dataId,
  favicon,
  url,
  title,
  description,
}: CardComponentProps) => {
  return (
    <TooltipProvider>
      <Card data-id={dataId} className="max-w-[300px] min-w-[250px]">
        <CardHeader>
          <CardTitle className="flex flex-col items-start gap-2" tabIndex={-1}>
            <img
              src={favicon}
              alt="favicon"
              height={32}
              width={32}
              className="w-8 h-8 aspect-square"
            />
            {/* <Facebook className="" tabIndex={-1} /> */}
            <Tooltip>
              <TooltipTrigger>
                <a
                  className="underline-offset-4 hover:underline"
                  href={url}
                  target="_blank"
                >
                  {title}
                </a>
              </TooltipTrigger>
              <TooltipContent>{title}</TooltipContent>
            </Tooltip>
          </CardTitle>

          <Tooltip>
            <TooltipTrigger>
              <CardDescription className="text-left line-clamp-3" tabIndex={-1}>
                {description}
              </CardDescription>
              <TooltipContent className="w-[200px]">
                {description}
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => deleteingSite(dataId)}
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

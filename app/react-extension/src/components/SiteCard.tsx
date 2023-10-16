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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteDoc } from "firebase/firestore";
import { Dexiedb, getDocumentRef } from "@/background/background";
import EditForm from "./EditForm";
import { sitesAtom } from "@/App";
import { useAtom } from "jotai";
import { siteType } from "@/@types/siteCard";

interface CardComponentProps {
  dataId: string;
  favicon: string;
  url: string;
  title: string;
  description: string;
  isPin: boolean;
}

// export const editFormOpenState = atom(false);

const CardComponent = ({
  dataId,
  favicon,
  url,
  title,
  isPin,
  description,
}: CardComponentProps) => {
  const [, setSites] = useAtom(sitesAtom);
  // const [open, setOpen] = useAtom(editFormOpenState);
  const deleteingSite = async (documentId: string) => {
    try {
      await deleteDoc(getDocumentRef("sites", documentId));
      await Dexiedb.deleteSite(documentId);
      toast.success("Site deleted");
      setSites((sites) =>
        sites.filter((site: siteType) => site.id !== documentId)
      );
    } catch (error) {
      toast.error("Error deleting site");
      console.error(error);
    }
  };
  return (
    <TooltipProvider>
      <Card data-id={dataId} className="w-72">
        <CardHeader>
          <CardTitle className="flex flex-col items-start gap-2" tabIndex={-1}>
            <div className="flex items-center justify-center w-12 h-12 rounded-sm shadow-md bg-accent-foreground shadow-accent">
              <img
                src={favicon}
                alt={title}
                height={32}
                width={32}
                className="w-8 h-8 aspect-square"
              />
            </div>

            {/* <Facebook className="" tabIndex={-1} /> */}
            <Tooltip>
              <TooltipTrigger>
                <a
                  className="flex-1 h-12 text-left underline-offset-4 hover:underline line-clamp-2"
                  href={url}
                  target="_blank"
                >
                  {title}
                </a>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px]">{title}</TooltipContent>
            </Tooltip>
          </CardTitle>

          <Tooltip>
            <TooltipTrigger>
              <CardDescription
                className="h-16 text-left line-clamp-3"
                tabIndex={-1}
              >
                {description}
              </CardDescription>
              <TooltipContent className="max-w-[200px]">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"icon"}>
                <Edit3 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Site</DialogTitle>
                <DialogDescription>Edit the site</DialogDescription>
              </DialogHeader>
              <EditForm
                dataId={dataId}
                description={description}
                url={url}
                title={title}
                isPin={isPin}
              />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default CardComponent;

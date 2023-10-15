import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle className="flex flex-col items-start gap-2" tabIndex={-1}>
          <div className="flex items-center justify-center w-12 h-12 rounded-sm ">
            <Skeleton className="h-full aspect-square" />
          </div>

          <div className="w-full h-12">
            <Skeleton className="w-full h-full" />
          </div>
        </CardTitle>

        <CardDescription className="h-16 text-left line-clamp-3" tabIndex={-1}>
          <Skeleton className="h-full" />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Skeleton className="w-10 h-10 rounded-sm" />
        <Skeleton className="w-10 h-10 rounded-sm" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;

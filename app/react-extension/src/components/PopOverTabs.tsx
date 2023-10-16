import { Dexiedb, siteRef } from "@/background/background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTitleAndDescription } from "@/lib/fetchTitleAndDescription";
import { faviconURL } from "@/lib/getFaviconUrl";
import { getActiveTabInfo } from "@/lib/openPopup";
import { Timestamp, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { atom, useAtom } from "jotai";
import { User } from "firebase/auth";
import { Site } from "@/lib/SwiftSearchDB";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "./ui/command";
import SearchCard from "./SearchCard";
import { Loader2Icon } from "lucide-react";

const userAuthAtom = atom<User | null>(null);

export default function TabsDemo() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useAtom(userAuthAtom);
  const [sites, setSites] = useState<Site[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "user" }, (response) => {
      console.log(response);
      if (response.success) {
        setUser(response.user);
        setLoading(false);
      } else {
        console.log("Data passage not working");
      }
    });
  }, []);
  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getData" }, (response) => {
      console.log(response);
      if (response.success) {
        setSites(response.sites);
      }
    });
  }, []);
  const addSite = async () => {
    try {
      setDisabled(true);
      const { info } = await getActiveTabInfo();
      const { title, description } = await fetchTitleAndDescription(
        info.url ?? ""
      );
      const res = await addDoc(siteRef, {
        title: info.title ?? title,
        description: description,
        url: info.url,
        favicon: faviconURL(info.url ?? ""),
        isPin: false,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
        user_id: user?.uid,
      });

      await Dexiedb.addSite({
        id: res.id,
        title: info.title ?? "",
        description: description ?? "",
        url: info.url as string,
        favicon: faviconURL(info.url ?? ""),
        isPin: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
        .then(() => toast.success("Site added successfully!"))
        .catch(() => toast.error("Error adding site!"));
    } catch (error) {
      console.error("Error adding site: ", error);
    } finally {
      setDisabled(false);
    }
  };
  if (!user) {
    if (loading) {
      return (
        <div className="w-[400px] p-4 space-y-4 flex flex-col justify-center items-center">
          <Loader2Icon className="animate-spin" />
        </div>
      );
    }
    return (
      <div className="w-[400px] p-4 space-y-4 flex flex-col justify-center">
        <h2 className="text-2xl font-bold">You don't seem logged in</h2>
        <a
          className="font-bold underline underline-offset-2"
          href={chrome.runtime.getURL("index.html")}
          target="_blank"
        >
          Log in here
        </a>{" "}
      </div>
    );
  }
  return (
    <Tabs defaultValue="add" className="w-[400px] p-2 max-h-96">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="add">Add Site</TabsTrigger>
        <TabsTrigger value="sites">Sites</TabsTrigger>
        <TabsTrigger value="info">Guide</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <Card>
          <CardHeader>
            <CardTitle>Add Site</CardTitle>
            <CardDescription>
              Add site to without going to{" "}
              <a
                className="font-bold underline underline-offset-2"
                href={chrome.runtime.getURL("index.html")}
                target="_blank"
              >
                Dashboard
              </a>{" "}
              page
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button disabled={disabled} onClick={() => addSite()}>
              Add site
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="info">
        <Card>
          <CardHeader>
            <CardTitle>Guide</CardTitle>
            <CardDescription>Your mini guide to Swift Search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center text-lg">
                <kbd className="px-2 py-1 font-mono font-bold bg-gray-200 border border-gray-300 rounded shadow-md">
                  Ctrl
                </kbd>
                <span className="mx-2">+</span>
                <kbd className="px-2 py-1 font-mono font-bold bg-gray-200 border border-gray-300 rounded shadow-md">
                  Shift
                </kbd>
                <span className="mx-2">+</span>
                <kbd className="px-2 py-1 font-mono font-bold bg-gray-200 border border-gray-300 rounded shadow-md">
                  1
                </kbd>
              </div>

              <p className="text-base font-medium">
                Use this command to access the search for your saved sites
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-lg">
                <kbd className="px-2 py-1 font-mono font-bold bg-gray-200 border border-gray-300 rounded shadow-md">
                  Ctrl
                </kbd>
                <span className="mx-2">+</span>
                <kbd className="px-2 py-1 font-mono font-bold bg-gray-200 border border-gray-300 rounded shadow-md">
                  Shift
                </kbd>
                <span className="mx-2">+</span>
                <kbd className="px-2 py-1 font-mono font-bold bg-gray-200 border border-gray-300 rounded shadow-md">
                  2
                </kbd>
              </div>

              <p className="text-base font-medium">
                Use this command to access the{" "}
                <a
                  className="font-bold underline underline-offset-2"
                  href={chrome.runtime.getURL("index.html")}
                  target="_blank"
                >
                  Dashboard
                </a>{" "}
                for your saved sites and manage them
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sites">
        <Card>
          <Command>
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {sites.filter((site: Site) => site.isPin).length > 0 && (
                <CommandGroup heading="Pinned Sites">
                  {sites &&
                    sites
                      .filter((site: Site) => site.isPin)
                      .map((site: Site) => (
                        <SearchCard
                          key={site.id}
                          favicon={site.favicon}
                          title={site.title}
                          url={site.url}
                          // description={site.description}
                        />
                      ))}
                </CommandGroup>
              )}
              {sites.filter((site: Site) => site.isPin === false).length >
                0 && (
                <CommandGroup heading="Sites">
                  {sites &&
                    sites
                      .filter((site: Site) => site.isPin === false)
                      .map((site: Site) => (
                        <SearchCard
                          key={site.id}
                          favicon={site.favicon}
                          title={site.title}
                          url={site.url}
                          // description={site.description}
                        />
                      ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

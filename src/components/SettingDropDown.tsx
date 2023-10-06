import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

const SettingDropDown = ({
  settingButton,
  signout,
}: {
  settingButton: ReactNode;
  signout: ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {settingButton}
        {/* <Button className="" size={"icon"}>
          <SettingsIcon />
        </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" loop sideOffset={-50} alignOffset={50}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("profile")}>
          Profile
        </DropdownMenuItem>
        {signout}
        {/* <DropdownMenuItem onClick={() => signOut()}>
          <DoorOpen /> Log Out
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingDropDown;

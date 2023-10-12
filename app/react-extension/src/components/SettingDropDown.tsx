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
      <DropdownMenuTrigger asChild>{settingButton}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" loop sideOffset={-50} alignOffset={50}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("profile")}>
          Profile
        </DropdownMenuItem>
        {signout}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingDropDown;

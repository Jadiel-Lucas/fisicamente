import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent className="p=0 z-[100]" side="left">
                {/*<SheetHeader>
                    <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                </SheetHeader>*/}
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
// header.tsx - Versão Completa e Corrigida

import Image from "next/image";
import { Loader } from "lucide-react";
import { 
    ClerkLoaded, 
    ClerkLoading,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/mascote_pixelado.svg" height={40} width={40} alt="Mascote" />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        Fisicamente
                    </h1>
                </div>
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        {/* Correção: A propriedade de redirecionamento foi removida daqui,
                          pois agora é controlada pelo <ClerkProvider> no layout.tsx
                        */}
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        {/* Correção: A propriedade foi trocada para o novo padrão do Clerk v5.
                        */}
                        <SignInButton
                            mode="modal"
                            fallbackRedirectUrl="/learn"
                        >
                            <Button size="lg" variant="ghost">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    )
}
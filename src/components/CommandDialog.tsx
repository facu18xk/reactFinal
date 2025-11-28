"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
    Home,
    Package,
    User,
} from "lucide-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"


export function CommandDialogMenu() {
    const [open, setOpen] = React.useState(false)

    const navigate = useNavigate();


    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((v) => !v)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const go = (path: string) => {
        navigate(path)
        setOpen(false)
    }

    return (
        <>
        

            <p
                className="text-muted-foreground text-sm cursor-pointer select-none"
                onClick={() => setOpen(true)}
            >
                Presiona <kbd className="bg-muted ..."><span className="text-xs">Ctrl + </span>J</kbd>
            </p>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Escribe un comando o busca una página..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Sugerencias">
                        <CommandItem onSelect={() => go("/")}>
                            <Home />
                            <span>Inicio</span>
                        </CommandItem>
                        <CommandItem onSelect={() => go("/customers")}>
                            <User />
                            <span>Clientes</span>
                        </CommandItem>

                        <CommandItem onSelect={() => go("/products")}>
                            <Package />
                            <span>Productos</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

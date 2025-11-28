import LoginForm  from "@/features/auth/LoginForm";
import { Icons } from "@/components/icons"

export default function AuthenticationPage() {
    return (
        <>
            <div className="relative container hidden flex-1 shrink-0 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            
                <div className="text-primary relative hidden h-full flex-col p-10 lg:flex dark:border-r">
                    <div className="bg-primary/5 absolute inset-0" />
                    <div className="relative z-20 flex items-center text-lg font-medium gap-x-2">
                        <Icons.logo/>
                       <span className="font-semibold tracking-tighter">FIUNI Mini ERP</span>
                    </div>
                   
                </div>
                <div className="flex items-center justify-center lg:h-lvh lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Autenticación
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                Ingresa tu correo y contraseña para poder ingresar
                            </p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}
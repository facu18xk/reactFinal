import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const result = await login(email, password);

    setIsLoading(false);
    
    if (!result.ok) {
      setErrorMsg(result.error ?? "Error desconocido");
      return;
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel className="sr-only" htmlFor="email">
              Email
            </FieldLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@example.com"
              type="email"
              disabled={isLoading}
              required
            />

            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              type="password"
              disabled={isLoading}
              required
            />

            {errorMsg && (
              <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
            )}
          </Field>

          <Field>
            <Button disabled={isLoading}>
              {isLoading && <Spinner />}
              Iniciar Sesión
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default LoginForm;

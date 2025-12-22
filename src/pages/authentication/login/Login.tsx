import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordVisible, setPasswordVisible] = useState(false); // Loading state

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {

      login(values.value, {
        onSuccess: () => navigate("/modules/marketting", { replace: true }),

        onError: (error) => {
          toast.error(`${error} `, {
            action: {
              label: "X",
              onClick: () => {},
            },
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      });

    },
  });

  return (
    <div className="">
      {/* Login form */}

      <div className="p-8 rounded-3xl border-gray-100 ">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Log in to your Account
        </h2>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (
                  !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
                    value
                  )
                ) {
                  return "Must be a valid email address";
                }
              },
            }}
          >
            {(field) => (
              <>
                <div className="space-y-2">
                  <div
                    className={`bg-gray-100 rounded-lg flex items-center px-4 py-2 ${
                      !field.state.meta.isValid &&
                      "border-1 border-red-600 bg-red-100"
                    }`}
                  >
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-gray-500">Email</span>
                      <Input
                        type="email"
                        className="border-0 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="matter@gmail.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  </div>
                  {!field.state.meta.isValid && (
                    <em className="text-xs text-red-600" role="alert">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              </>
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters long";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }

                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
              },
            }}
          >
            {(field) => (
              <>
                <div className="space-y-2">
                  <div
                    className={`bg-gray-100 rounded-lg flex items-center px-4 py-2 ${
                      !field.state.meta.isValid &&
                      "border-1 border-red-600 bg-red-100"
                    }`}
                  >
                    <Lock className="h-5 w-5 text-gray-500 mr-2" />
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-gray-500">Password</span>
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        className="border-0 p-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="*****"
                      />
                    </div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    >
                      {passwordVisible ? (
                        <EyeOff className="h-5 w-5 text-gray-500 mr-2" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 mr-2" />
                      )}
                    </div>
                  </div>
                  {!field.state.meta.isValid && (
                    <em className="text-xs text-red-600" role="alert">
                      {field.state.meta.errors}
                    </em>
                  )}
                </div>
              </>
            )}
          </form.Field>
          <div className="text-center">
            {/* <Link to="/auth/reset-password"> */}
            {/* <a className="text-sm font-[400] text-[#0C2724] ">
              Forgot password?
            </a> */}
            {/* </Link> */}
          </div>
          <Button
            onClick={form.handleSubmit}
            className="w-full py-6 bg-gradient-to-b from-[#0FBA3A] to-[#04972C] hover:bg-green-600 text-white rounded-full hover:from-[#0FA93A] hover:to-[#04762C] "
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

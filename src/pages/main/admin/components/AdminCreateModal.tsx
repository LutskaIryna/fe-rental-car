import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRegisterUserWithRoleAdminMutation } from "@/store/api/auth.api";

type FormData = {
  email: string;
  password: string;
};

export const AdminCreateModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [registerUserWithRole, { isLoading }] = useRegisterUserWithRoleAdminMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUserWithRole({
        ...data,
        role: "admin",
      }).unwrap();
 
      reset();
      alert("Admin created successfully!");
    } catch (error: any) {
      console.error("Failed to create admin:", error);
      alert(error?.data?.message || "Failed to create admin");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Admin</DialogTitle>
          <DialogDescription>Fill in email and password.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Admin"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

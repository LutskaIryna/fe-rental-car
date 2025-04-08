import { Card, CardContent } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="shadow-xl">
          <CardContent className="p-6 space-y-6">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

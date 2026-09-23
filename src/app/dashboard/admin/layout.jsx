import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { House, Envelope } from "@gravity-ui/icons";

const AdminLayoutPage = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center -mt-26 h-screen">
        <div className="max-w-2xl w-full text-center">
          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-400">
            Access Denied
          </h1>
          <p className="text-lg text-muted mb-2">
            You don&apos;t have permission to access this page.
          </p>
          <p className="text-sm text-muted mb-10">
            If you believe this is a mistake, please contact support.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-fit bg-white dark:bg-foreground/10 active:bg-foreground/5 border  font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <House className="w-5 h-5" />
              Go Home
            </Link>
            <a
              href="mailto:support@worksphere.com"
              className="flex items-center justify-center gap-2 w-fit bg-white dark:bg-foreground/10 active:bg-foreground/5 border  font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <Envelope className="w-5 h-5" />
              Contact support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AdminLayoutPage;

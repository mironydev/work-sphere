import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Lock, House, Envelope } from "@gravity-ui/icons";

const AdminLayoutPage = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    return (
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-600/20 mb-6">
            <Lock className="w-10 h-10 text-red-600 dark:text-red-500" />
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-muted mb-2">
            You don&apos;t have permission to access this page.
          </p>
          <p className="text-sm text-muted mb-10">
            If you believe this is a mistake, please contact support.
          </p>

          {/* Info Box */}
          <div className="mb-10 p-6 rounded-lg bg-foreground/5 border border-red-200/30 dark:border-red-400/20">
            <p className="text-sm text-muted">
              Make sure you&apos;re logged in with the correct account and have
              the necessary permissions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <House className="w-5 h-5" />
              Go Home
            </Link>
            <a
              href="mailto:support@worksphere.com"
              className="flex items-center justify-center gap-2 bg-foreground/10 hover:bg-foreground/20 text-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <Envelope className="w-5 h-5" />
              Contact support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminLayoutPage;

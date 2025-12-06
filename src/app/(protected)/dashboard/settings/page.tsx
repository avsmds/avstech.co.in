"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/authstore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Shield,
  Save,
  Laptop,
  Smartphone,
  Globe,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

// ====== Zod Schemas ======
const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
});

const emailConfirmSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required to change email")
    .min(8, "Password must be at least 8 characters"),
});

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "New password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type EmailConfirmValues = z.infer<typeof emailConfirmSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

// ====== Helper Functions ======
const getDeviceIcon = (deviceType: string) => {
  const lowerType = deviceType.toLowerCase();
  if (
    lowerType.includes("desktop") ||
    lowerType.includes("mac") ||
    lowerType.includes("windows")
  ) {
    return <Laptop className="w-5 h-5 text-muted-foreground" />;
  }
  if (
    lowerType.includes("phone") ||
    lowerType.includes("android") ||
    lowerType.includes("ios")
  ) {
    return <Smartphone className="w-5 h-5 text-muted-foreground" />;
  }
  return <Globe className="w-5 h-5 text-muted-foreground" />;
};

// ====== Main Component ======
export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const updateName = useAuthStore((state) => state.updateName);
  const updateEmail = useAuthStore((state) => state.updateEmail);
  const updatePassword = useAuthStore((state) => state.updatePassword);
  const sessions = useAuthStore((state) => state.sessions);
  const fetchSessions = useAuthStore((state) => state.fetchSessions);
  const revokeSession = useAuthStore((state) => state.revokeSession);

  // Profile Form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // Email Confirmation Form
  const emailConfirmForm = useForm<EmailConfirmValues>({
    resolver: zodResolver(emailConfirmSchema),
    defaultValues: {
      currentPassword: "",
    },
  });

  // Password Form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const profileEmail = profileForm.watch("email");
  const isEmailChanged = user && profileEmail !== user.email;

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      fetchSessions().catch((error) => {
        console.error("Failed to fetch sessions:", error);
        toast.error("Failed to load active sessions");
      });

      const parts = user.name.split(" ");
      profileForm.reset({
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        email: user.email,
      });
    }
  }, [user, fetchSessions, profileForm]);

  // ====== Form Handlers ======
  const handleProfileSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    try {
      const fullName = `${values.firstName} ${values.lastName}`.trim();
      const nameChanged = fullName !== user.name;
      const emailChanged = values.email !== user.email;

      // Update name if changed
      if (nameChanged) {
        await updateName(fullName);
        toast.success("Name updated successfully");
      }

      // Update email if changed (requires password)
      if (emailChanged) {
        // Email change requires password confirmation
        return; // Don't submit here, let the email confirmation dialog handle it
      }

      if (!nameChanged && !emailChanged) {
        toast.info("No changes to save");
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleEmailConfirm = async (values: EmailConfirmValues) => {
    if (!user) return;

    const newEmail = profileForm.getValues("email");

    try {
      await updateEmail(newEmail, values.currentPassword);
      toast.success("Email updated successfully");
      emailConfirmForm.reset();
    } catch (error: any) {
      console.error("Email update error:", error);
      toast.error(error.message || "Failed to update email");
      throw error; // Re-throw to prevent dialog from closing
    }
  };

  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    try {
      await updatePassword(values.currentPassword, values.newPassword);
      passwordForm.reset();
      toast.success("Password changed successfully");
    } catch (error: any) {
      console.error("Password update error:", error);
      toast.error(error.message || "Failed to update password");
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await revokeSession(sessionId);
      toast.success("Session revoked successfully");
    } catch (error: any) {
      console.error("Session revoke error:", error);
      toast.error(error.message || "Failed to revoke session");
    }
  };

  // ====== Loading & Error States ======
  if (loading && !user) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <div>
            <h2 className="text-xl font-semibold">Authentication Required</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Please sign in to access settings
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-3xl font-black tracking-tighter mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, security, and active sessions.
        </p>
      </div>

      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal details and email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={profileForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          disabled={profileForm.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          disabled={profileForm.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                        disabled={profileForm.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Changing your email will require password confirmation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEmailChanged ? (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Email Change Requires Verification
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                          Please confirm your current password to update your email
                          address.
                        </p>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="default"
                            size="sm"
                            disabled={
                              !profileForm.formState.isValid ||
                              profileForm.formState.isSubmitting
                            }
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Confirm Email Change
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Email Change</AlertDialogTitle>
                            <AlertDialogDescription asChild>
                              <div className="space-y-4">
                                <p>
                                  You're changing your email from{" "}
                                  <span className="font-semibold text-foreground">
                                    {user.email}
                                  </span>{" "}
                                  to{" "}
                                  <span className="font-semibold text-foreground">
                                    {profileEmail}
                                  </span>
                                  .
                                </p>
                                <Form {...emailConfirmForm}>
                                  <form
                                    onSubmit={emailConfirmForm.handleSubmit(
                                      handleEmailConfirm
                                    )}
                                    className="space-y-4"
                                  >
                                    <FormField
                                      control={emailConfirmForm.control}
                                      name="currentPassword"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Current Password</FormLabel>
                                          <FormControl>
                                            <Input
                                              type="password"
                                              placeholder="Enter your password"
                                              {...field}
                                              disabled={
                                                emailConfirmForm.formState
                                                  .isSubmitting
                                              }
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </form>
                                </Form>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              disabled={emailConfirmForm.formState.isSubmitting}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={emailConfirmForm.handleSubmit(
                                handleEmailConfirm
                              )}
                              disabled={emailConfirmForm.formState.isSubmitting}
                            >
                              {emailConfirmForm.formState.isSubmitting && (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              )}
                              Confirm Change
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  type="submit"
                  disabled={
                    !profileForm.formState.isDirty ||
                    profileForm.formState.isSubmitting
                  }
                >
                  {profileForm.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Active Sessions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Laptop className="w-5 h-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage devices currently logged into your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.length === 0 ? (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">
                  Loading sessions...
                </p>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.$id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-secondary rounded-full flex-shrink-0">
                      {getDeviceIcon(session.clientType)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {session.osName} {session.osVersion} — {session.clientName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="truncate">{session.ip}</span>
                        <span>•</span>
                        <span className="truncate">
                          {session.countryName !== "Unknown"
                            ? session.countryName
                            : "Unknown Location"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {session.current ? (
                      <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 border border-green-200 dark:border-green-900">
                        Current
                      </div>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            Revoke
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Revoke Session?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will log out the device and end this session. The
                              user will need to sign in again.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRevokeSession(session.$id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Revoke Session
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        {...field}
                        disabled={passwordForm.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (passwordForm.formState.errors.confirmPassword) {
                            passwordForm.trigger("confirmPassword");
                          }
                        }}
                        disabled={passwordForm.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Password must contain at least 8 characters, one uppercase, one
                      lowercase, and one number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                        disabled={passwordForm.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="secondary"
                disabled={
                  !passwordForm.formState.isDirty ||
                  passwordForm.formState.isSubmitting
                }
              >
                {passwordForm.formState.isSubmitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
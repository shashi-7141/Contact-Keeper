"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Bell, Shield, Database } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ResourceProvider } from "@/lib/resource-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SettingsContent() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    alerts: true,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="h-6" />
        <div>
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your preferences and configurations
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="size-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how CloudOps looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Theme</Label>
                {mounted && (
                  <div className="grid grid-cols-3 gap-2">
                    {themeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant="outline"
                        className={cn(
                          "flex flex-col items-center gap-2 h-auto py-4",
                          theme === option.value && "border-primary bg-primary/5"
                        )}
                        onClick={() => setTheme(option.value)}
                      >
                        <option.icon className="size-5" />
                        <span className="text-sm">{option.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="size-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your resources
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="alert-notifications">Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about resource errors and issues
                  </p>
                </div>
                <Switch
                  id="alert-notifications"
                  checked={notifications.alerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, alerts: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Keys</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage your API keys for programmatic access
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="size-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Export or manage your resource data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download all your resource data as JSON
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

export default function SettingsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ResourceProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <SettingsContent />
          </SidebarInset>
        </SidebarProvider>
      </ResourceProvider>
    </ThemeProvider>
  );
}

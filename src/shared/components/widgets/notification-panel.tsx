"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  Bell,
  Check,
  Info,
  Download,
  FileText,
  DollarSign,
  Package,
} from "lucide-react";
import { useState, useMemo } from "react";

const notifications = [
  {
    id: 1,
    type: "mention",
    title: "Jayvon Hull mentioned you in Minimal UI",
    description:
      "@Jaydon Frankie feedback by asking questions or just leave a note of appreciation.",
    timestamp: "a day ago",
    project: "Project UI",
    read: false,
    icon: <Info className="h-4 w-4" />,
    avatar: "https://github.com/shadcn.png",
    actions: ["Reply"],
  },
  {
    id: 2,
    type: "file",
    title: "Lainey Davidson added file to File manager",
    description: "design-suriname-2015.mp4",
    fileSize: "2.3 MB",
    timestamp: "2 days ago",
    project: "File manager",
    read: false,
    icon: <FileText className="h-4 w-4" />,
    avatar: "https://github.com/shadcn.png",
    actions: ["Download"],
  },
  {
    id: 3,
    type: "tags",
    title: "Angelique Morse added new tags to File manager",
    description: "",
    timestamp: "3 days ago",
    project: "File manager",
    read: false,
    icon: <FileText className="h-4 w-4" />,
    avatar: "https://github.com/shadcn.png",
    tags: ["Design", "Dashboard", "Design system"],
    actions: [],
  },
  {
    id: 4,
    type: "payment",
    title: "Giana Brandt request a payment of $200",
    description: "",
    timestamp: "4 days ago",
    project: "File manager",
    read: false,
    icon: <DollarSign className="h-4 w-4" />,
    avatar: "https://github.com/shadcn.png",
    actions: ["Pay", "Decline"],
  },
  {
    id: 5,
    type: "order",
    title: "Your order is placed waiting for shipping",
    description: "",
    timestamp: "5 days ago",
    project: "",
    read: false,
    icon: <Package className="h-4 w-4" />,
    avatar: "https://github.com/shadcn.png",
    actions: [],
  },
  {
    id: 6,
    type: "success",
    title: "Payment successful",
    description: "Your payment of $99 has been successfully processed.",
    timestamp: "1 week ago",
    project: "",
    read: true,
    icon: <Check className="h-4 w-4 text-green-500" />,
    avatar: "https://github.com/shadcn.png",
    actions: [],
  },
];

export function NotificationPanel() {
  const [notificationState, setNotificationState] = useState(notifications);
  const [activeTab, setActiveTab] = useState("all");

  const { unreadCount, archivedCount, filteredNotifications } = useMemo(() => {
    const unread = notificationState.filter((n) => !n.read).length;
    const archived = notificationState.filter((n) => n.read).length;

    let filtered;
    switch (activeTab) {
      case "unread":
        filtered = notificationState.filter((n) => !n.read);
        break;
      case "archived":
        filtered = notificationState.filter((n) => n.read);
        break;
      default:
        filtered = notificationState;
    }

    return {
      unreadCount: unread,
      archivedCount: archived,
      filteredNotifications: filtered,
    };
  }, [notificationState, activeTab]);

  const markAllAsRead = () => {
    setNotificationState((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotificationState([]);
  };

  const markAsRead = (id: number) => {
    setNotificationState((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-1 text-[10px]">
              {unreadCount}
            </Badge>
          )}
          <Bell className="h-5 w-5" />
          <span className="sr-only">Open notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 sm:w-96 flex flex-col max-h-screen">
        <SheetHeader className="flex-shrink-0 px-6 py-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            Notifications
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-shrink-0 px-6 py-4 border-b">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full h-full flex flex-col"
            >
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="all" className="text-xs relative">
                  All
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 w-4 text-[10px] p-0 flex items-center justify-center"
                  >
                    {notificationState.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-xs relative">
                  Unread
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 w-4 text-[10px] p-0 flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="archived" className="text-xs relative">
                  Read
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 w-4 text-[10px] p-0 flex items-center justify-center"
                  >
                    {archivedCount}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              {(unreadCount > 0 || notificationState.length > 0) && (
                <div className="flex items-center gap-2 mt-3">
                  {unreadCount > 0 && (
                    <Button
                      size="sm"
                      variant="default"
                      className="h-7 text-xs"
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </Button>
                  )}
                  {notificationState.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={clearAll}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              )}

              <TabsContent
                value={activeTab}
                className="flex-1 mt-4 m-0 overflow-hidden"
              >
                <div className="h-full overflow-y-auto px-2">
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-1">
                      {filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="group relative flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent/50 cursor-pointer"
                          onClick={() =>
                            !notification.read && markAsRead(notification.id)
                          }
                        >
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage
                              src={notification.avatar || "/placeholder.svg"}
                              alt={notification.title}
                            />
                            <AvatarFallback className="text-xs">
                              {notification.title.split(" ")[0]?.[0] || "U"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium leading-tight line-clamp-2">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary mt-1" />
                              )}
                            </div>

                            {notification.description && (
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {notification.description}
                              </p>
                            )}

                            {notification.fileSize && (
                              <div className="flex items-center gap-2 p-2 bg-accent/30 rounded-md">
                                <div className="h-6 w-6 bg-primary/10 rounded flex items-center justify-center">
                                  <FileText className="h-3 w-3" />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {notification.fileSize}
                                </span>
                              </div>
                            )}

                            {notification.tags && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {notification.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant={
                                      tag === "Dashboard"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="text-[10px] h-5 px-2"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-1">
                              <p className="text-xs text-muted-foreground">
                                {notification.timestamp}
                                {notification.project && (
                                  <span className="ml-1">
                                    • {notification.project}
                                  </span>
                                )}
                              </p>
                            </div>

                            {notification.actions &&
                              notification.actions.length > 0 && (
                                <div className="flex gap-2 pt-2">
                                  {notification.actions.map((action, index) => (
                                    <Button
                                      key={index}
                                      size="sm"
                                      variant={
                                        action === "Pay" ? "default" : "outline"
                                      }
                                      className="h-6 text-xs px-3"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {action === "Download" && (
                                        <Download className="h-3 w-3 mr-1" />
                                      )}
                                      {action}
                                    </Button>
                                  ))}
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                      No notifications found
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {filteredNotifications.length > 0 && (
            <div className="flex-shrink-0 px-6 py-3 border-t bg-muted/20">
              <Button variant="ghost" className="w-full text-xs h-8">
                View all notifications
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

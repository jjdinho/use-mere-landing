"use client"

import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Documentation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isSectionActive =
            pathname === item.url ||
            item.items?.some((subItem) => pathname === subItem.url)

          return (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive || isSectionActive}
              render={<SidebarMenuItem />}
            >
              <SidebarMenuButton
                tooltip={item.title}
                render={<a href={item.url} />}
                isActive={pathname === item.url}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <SidebarMenuAction
                    render={<CollapsibleTrigger />}
                    className="aria-expanded:rotate-90"
                  >
                    <ChevronRightIcon />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            render={<a href={subItem.url} />}
                            isActive={pathname === subItem.url}
                          >
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

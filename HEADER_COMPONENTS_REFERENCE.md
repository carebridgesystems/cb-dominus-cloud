# Header/Title Bar Components Reference

This document outlines all available header/title bar patterns found in the shadcn/ui blocks and components.

---

## 1. **SiteHeader** (Sidebar-16) - Full Featured Header
**Location:** `src/registry/new-york-v4/blocks/sidebar-16/components/site-header.tsx`

**Features:**
- ✅ Sticky header at top
- ✅ Sidebar toggle button
- ✅ Breadcrumb navigation
- ✅ Search form (right-aligned)
- ✅ Vertical separator
- ✅ Responsive design

**Structure:**
```tsx
<header className='bg-background sticky top-0 z-50 flex w-full items-center border-b'>
  <div className='flex h-(--header-height) w-full items-center gap-2 px-4'>
    <Button onClick={toggleSidebar}>...</Button>
    <Separator />
    <Breadcrumb>...</Breadcrumb>
    <SearchForm className='w-full sm:ml-auto sm:w-auto' />
  </div>
</header>
```

**Best for:** Admin dashboards with search functionality

---

## 2. **Simple Breadcrumb Header** (Sidebar-09)
**Location:** `src/registry/new-york-v4/blocks/sidebar-09/page.tsx`

**Features:**
- ✅ Sticky header
- ✅ Sidebar trigger
- ✅ Breadcrumb navigation
- ✅ Minimal design
- ✅ Padding included

**Structure:**
```tsx
<header className='bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4'>
  <SidebarTrigger className='-ml-1' />
  <Separator orientation='vertical' />
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem className='hidden md:block'>
        <BreadcrumbLink href='#'>All Inboxes</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className='hidden md:block' />
      <BreadcrumbItem>
        <BreadcrumbPage>Inbox</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</header>
```

**Best for:** Simple apps with breadcrumb navigation

---

## 3. **Compact Header** (Sidebar-12)
**Location:** `src/registry/new-york-v4/blocks/sidebar-12/page.tsx`

**Features:**
- ✅ Fixed height (h-16)
- ✅ Sidebar trigger
- ✅ Simple breadcrumb
- ✅ Clean, minimal design

**Structure:**
```tsx
<header className='bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4'>
  <SidebarTrigger className='-ml-1' />
  <Separator orientation='vertical' />
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbPage>October 2024</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</header>
```

**Best for:** Calendar views, date-based interfaces

---

## 4. **Multi-Level Breadcrumb Header** (Sidebar-11)
**Location:** `src/registry/new-york-v4/blocks/sidebar-11/page.tsx`

**Features:**
- ✅ Fixed height (h-16)
- ✅ Sidebar trigger
- ✅ Multi-level breadcrumbs (3+ levels)
- ✅ Responsive (hidden on mobile)

**Structure:**
```tsx
<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
  <SidebarTrigger className='-ml-1' />
  <Separator orientation='vertical' />
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem className='hidden md:block'>
        <BreadcrumbLink href='#'>components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className='hidden md:block' />
      <BreadcrumbItem className='hidden md:block'>
        <BreadcrumbLink href='#'>ui</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className='hidden md:block' />
      <BreadcrumbItem>
        <BreadcrumbPage>button.tsx</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</header>
```

**Best for:** File browsers, nested navigation, code editors

---

## 5. **Minimal Header** (Sidebar-15)
**Location:** `src/registry/new-york-v4/blocks/sidebar-15/page.tsx`

**Features:**
- ✅ Sticky header
- ✅ Smaller height (h-14)
- ✅ Sidebar trigger
- ✅ Single breadcrumb with line-clamp
- ✅ Centered content area

**Structure:**
```tsx
<header className='bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2'>
  <div className='flex flex-1 items-center gap-2 px-3'>
    <SidebarTrigger />
    <Separator orientation='vertical' />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className='line-clamp-1'>
            Project Management & Task Tracking
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</header>
```

**Best for:** Project management tools, focused workspaces

---

## 6. **Menubar Component** (Available)
**Location:** `src/registry/new-york-v4/ui/menubar.tsx`

**Features:**
- ✅ Menu-based navigation
- ✅ Dropdown menus
- ✅ Checkbox/radio items
- ✅ Keyboard shortcuts
- ✅ Sub-menus

**Structure:**
```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Exit</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

**Best for:** Desktop-style applications, menu bars

---

## Comparison Table

| Pattern | Height | Search | Breadcrumbs | Complexity | Use Case |
|---------|--------|--------|-------------|------------|----------|
| **SiteHeader** | Variable | ✅ | ✅ | High | Admin dashboards |
| **Simple Breadcrumb** | Auto | ❌ | ✅ | Low | Simple apps |
| **Compact** | h-16 | ❌ | ✅ | Low | Calendar/date views |
| **Multi-Level** | h-16 | ❌ | ✅✅✅ | Medium | File browsers |
| **Minimal** | h-14 | ❌ | ✅ | Low | Project tools |
| **Menubar** | h-9 | ❌ | ❌ | Medium | Desktop apps |

---

## Recommendations for Dominus Cloud

Based on your admin orchestrator use case, I recommend:

1. **SiteHeader (Sidebar-16)** - Best overall fit
   - Has search functionality (useful for finding projects/secrets)
   - Breadcrumbs for navigation context
   - Professional admin dashboard look

2. **Multi-Level Breadcrumb (Sidebar-11)** - Alternative
   - Good if you have deep navigation (e.g., Projects > Project Name > Settings)
   - Cleaner if you don't need search in the header

3. **Custom Hybrid** - Combine elements
   - Take SiteHeader's search
   - Add user menu/notifications
   - Customize breadcrumbs for your routes

---

## Next Steps

1. Choose a pattern or create a custom one
2. Integrate into `src/app/(dashboard)/layout.tsx`
3. Customize breadcrumbs for your routes (Dashboard, Projects, Secrets, Settings)
4. Add user menu/notifications if needed
5. Test responsive behavior


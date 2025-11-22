# Sidebar Trigger Button Options

**Official shadcn/ui Patterns & Options**

---

## Current Implementation

**What you have now:**
- `SidebarTrigger` component (official shadcn/ui component)
- Uses `PanelLeftIcon` from lucide-react
- Size: `h-7 w-7` (28px × 28px)
- Variant: `ghost`
- Placement: Left side of header, before separator

---

## Official shadcn/ui Options

### 1. **SidebarTrigger Component** (Current - Recommended ✅)

**What it is:**
- Official shadcn/ui component
- Built-in accessibility
- Proper ARIA labels
- Keyboard shortcut support (Ctrl/Cmd + B)

**Icon:** `PanelLeftIcon` (default)
**Size:** `h-7 w-7` (28px)
**Variant:** `ghost`

**Usage:**
```tsx
<SidebarTrigger className='-ml-1' />
```

**Styling Options:**
```tsx
// Different sizes
<SidebarTrigger className='h-8 w-8' />      // Larger (32px)
<SidebarTrigger className='h-6 w-6' />      // Smaller (24px)
<SidebarTrigger className='h-9 w-9' />      // Extra large (36px)

// Different positions
<SidebarTrigger className='-ml-1' />       // Default (slight left margin)
<SidebarTrigger className='ml-0' />         // No margin
<SidebarTrigger className='mr-2' />        // Right margin

// Different variants (via className override)
<SidebarTrigger className='hover:bg-accent' />
```

---

### 2. **Custom Button with Different Icons**

You can create a custom button using the `useSidebar` hook with different icons:

**Available Icons from lucide-react:**

| Icon | Description | Visual Style |
|------|-------------|--------------|
| `PanelLeftIcon` | **Default** - Panel with line on left | ⬛ |
| `Menu` | Hamburger menu (3 lines) | ☰ |
| `AlignJustify` | 4 horizontal lines | ☰☰ |
| `SidebarIcon` | Sidebar icon (used in sidebar-16) | ⬛ |
| `ChevronLeft` | Left arrow | ◀ |
| `X` | Close icon | ✕ |

**Example with Menu icon:**
```tsx
import { Button } from '@/registry/new-york-v4/ui/button';
import { useSidebar } from '@/registry/new-york-v4/ui/sidebar';
import { Menu } from 'lucide-react';

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  
  return (
    <header>
      <Button 
        variant='ghost' 
        size='icon' 
        className='h-8 w-8'
        onClick={toggleSidebar}
      >
        <Menu />
      </Button>
    </header>
  );
}
```

---

### 3. **Official shadcn/ui Patterns**

**Pattern 1: Sidebar-09, Sidebar-11, Sidebar-12** (Most Common)
```tsx
<header className='bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4'>
  <SidebarTrigger className='-ml-1' />
  <Separator orientation='vertical' className='mr-2 h-4' />
  <Breadcrumb>...</Breadcrumb>
</header>
```

**Pattern 2: Sidebar-15** (Minimal)
```tsx
<header className='bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2'>
  <div className='flex flex-1 items-center gap-2 px-3'>
    <SidebarTrigger />
    <Separator orientation='vertical' className='mr-2 h-4' />
    <Breadcrumb>...</Breadcrumb>
  </div>
</header>
```

**Pattern 3: Sidebar-16** (Custom Button)
```tsx
<header>
  <Button 
    className='h-8 w-8' 
    variant='ghost' 
    size='icon' 
    onClick={toggleSidebar}
  >
    <SidebarIcon />
  </Button>
</header>
```

---

## Icon Comparison

### PanelLeftIcon (Current - Official)
- ✅ Official shadcn/ui default
- ✅ Clear "panel" visual
- ✅ Standard for admin dashboards
- **Visual:** Panel with vertical line on left

### Menu (Hamburger)
- ✅ Universal recognition
- ✅ Common in mobile-first designs
- ✅ Clean, minimal
- **Visual:** Three horizontal lines

### AlignJustify
- ✅ Similar to Menu
- ✅ More lines = more "menu" feel
- **Visual:** Four horizontal lines

### SidebarIcon
- ✅ Specific sidebar icon
- ✅ Used in sidebar-16 example
- **Visual:** Sidebar panel icon

---

## Recommended Options

### Option 1: Keep Current (PanelLeftIcon) ✅
**Best for:** Standard admin dashboards
```tsx
<SidebarTrigger className='-ml-1' />
```

### Option 2: Menu Icon (Hamburger)
**Best for:** Modern, mobile-first feel
```tsx
import { Menu } from 'lucide-react';
import { Button } from '@/registry/new-york-v4/ui/button';
import { useSidebar } from '@/registry/new-york-v4/ui/sidebar';

const { toggleSidebar } = useSidebar();
<Button variant='ghost' size='icon' className='h-8 w-8' onClick={toggleSidebar}>
  <Menu />
</Button>
```

### Option 3: Larger Trigger
**Best for:** More prominent toggle
```tsx
<SidebarTrigger className='h-9 w-9 -ml-1' />
```

### Option 4: With Tooltip
**Best for:** Better UX with hover hint
```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york-v4/ui/tooltip';

<Tooltip>
  <TooltipTrigger asChild>
    <SidebarTrigger className='-ml-1' />
  </TooltipTrigger>
  <TooltipContent>Toggle sidebar</TooltipContent>
</Tooltip>
```

---

## Placement Options

### Current: Left of Header (Standard)
```tsx
<header>
  <SidebarTrigger />  ← Left side
  <Separator />
  <Breadcrumb />
</header>
```

### Alternative: Inside Sidebar Header
```tsx
<SidebarHeader>
  <SidebarTrigger />  ← Inside sidebar
  <div>Logo</div>
</SidebarHeader>
```

### Alternative: Right Side
```tsx
<header>
  <Breadcrumb />
  <Separator />
  <SidebarTrigger className='ml-auto' />  ← Right side
</header>
```

---

## Size Options

| Size Class | Pixels | Use Case |
|-----------|--------|----------|
| `h-6 w-6` | 24px | Compact headers |
| `h-7 w-7` | 28px | **Default** (current) |
| `h-8 w-8` | 32px | Standard (recommended) |
| `h-9 w-9` | 36px | Prominent |
| `h-10 w-10` | 40px | Large, touch-friendly |

---

## Which Should You Use?

**For Official shadcn/ui:**
- ✅ **Keep `SidebarTrigger`** - It's the official component
- ✅ **Keep `PanelLeftIcon`** - It's the default and standard
- ✅ **Current placement** - Left of header is standard

**If you want to change:**
- **Menu icon** - More modern, mobile-first feel
- **Larger size** - `h-8 w-8` or `h-9 w-9` for better visibility
- **Add tooltip** - Better UX for users

---

## Quick Reference

**Current (Official):**
```tsx
<SidebarTrigger className='-ml-1' />
```

**Menu Icon (Alternative):**
```tsx
import { Menu } from 'lucide-react';
import { Button } from '@/registry/new-york-v4/ui/button';
import { useSidebar } from '@/registry/new-york-v4/ui/sidebar';

const { toggleSidebar } = useSidebar();
<Button variant='ghost' size='icon' className='h-8 w-8' onClick={toggleSidebar}>
  <Menu />
</Button>
```

**Larger Official:**
```tsx
<SidebarTrigger className='h-8 w-8 -ml-1' />
```


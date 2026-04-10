# Design System Document: The Fluid Conversationalist

## 1. Overview & Creative North Star
Most chat applications feel like utility tools—rigid, boxed-in, and transactional. This design system rejects the "utility-first" aesthetic in favor of **"The Digital Sanctuary."** 

Our Creative North Star is a high-end, editorial-inspired environment that prioritizes cognitive ease and visual serenity. We achieve this by breaking the traditional "grid-of-boxes" layout. Instead of hard containers, we use **Intentional Asymmetry** and **Tonal Depth**. Elements should feel like they are floating in a liquid space, using overlapping glass layers and soft gradients to guide the eye, rather than harsh lines and separators.

---

## 2. Colors: Tonal Architecture
We move beyond flat color palettes to a system of "Atmospheric Tones."

### The Palette
*   **Primary Core:** `primary` (#4a40e0) to `primary_container` (#9795ff). This indigo gradient is our signature. It should be used for high-impact actions and brand moments.
*   **The Vibrant Green:** `tertiary` (#006947) and `tertiary_fixed` (#69f6b8). Reserved strictly for "Live" states—online indicators, active typing, and success confirmations.
*   **Neutral Foundation:** `surface` (#faf4ff) and `on_surface` (#32294f). We use a warm, tinted neutral to avoid the "cold" feeling of pure grey.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate the sidebar, chat window, or thread panel. Sectioning is achieved exclusively through:
1.  **Background Shifts:** Placing a `surface_container_low` sidebar against a `surface` main chat area.
2.  **Negative Space:** Using the spacing scale to create "islands" of content.

### Glass & Gradient Signature
*   **Main CTAs:** Use a linear gradient from `primary` to `primary_dim`.
*   **Floating Panels:** Use `surface_container_lowest` at 80% opacity with a `24px` backdrop-blur. This "frosted glass" effect allows the soft indigos and greens of the background to bleed through, creating a sense of unity.

---

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headline) with **Inter** (Body) to create a balance between "Character" and "Clarity."

*   **The Display Scale:** Use `display-lg` (3.5rem) sparingly for onboarding or empty states. The Manrope typeface provides a geometric, modern authority.
*   **The Conversation Flow:** `body-lg` (1rem) is the workhorse. We use a generous line-height (1.6) to ensure long threads remain readable and don't feel cluttered.
*   **Labeling:** `label-sm` (0.6875rem) in `on_surface_variant` is used for timestamps and metadata. It should feel like a whisper, not a shout.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "heavy" for this system. We use **Tonal Layering** to convey hierarchy.

*   **The Layering Principle:** 
    *   **Level 0 (Base):** `surface`
    *   **Level 1 (Sidebars):** `surface_container_low`
    *   **Level 2 (Active Chat Bubble):** `primary_container`
    *   **Level 3 (Modals/Popovers):** `surface_container_highest`
*   **Ambient Shadows:** For floating elements like tooltips or user profiles, use a shadow with a 30px blur, 0% spread, and 6% opacity of the `on_surface` color. It should feel like a natural light source is hitting the UI.
*   **The Ghost Border Fallback:** If a container requires definition against a similar background (e.g., in Dark Mode), use the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components: Fluid Primitives

### Chat Bubbles (The Core)
*   **Sent:** Gradient from `primary` to `primary_dim`. Text in `on_primary`. Corner radius: `xl` (3rem), with the bottom-right corner tucked to `sm` (0.5rem) to indicate direction.
*   **Received:** `surface_container_high`. Corner radius: `xl`, with the bottom-left corner tucked to `sm`. 
*   **Spacing:** No dividers. Use `1.5rem` of vertical space between different speakers and `0.25rem` between consecutive messages from the same speaker.

### Input Fields
*   **Styling:** A single pill-shaped (`full` radius) container using `surface_container_highest`. 
*   **State:** On focus, do not use a border. Use a subtle glow—a 4px outer shadow using the `primary` color at 20% opacity.

### Interactive Elements
*   **Buttons:** `xl` (3rem) roundedness. Primary buttons use the indigo gradient; secondary buttons use `surface_container_highest` with no border.
*   **Status Indicators:** A 12px circle using `tertiary_fixed`. Add a "breathing" animation (subtle scale up/down) to the active indicator to give the app a "pulse."
*   **Glass Modals:** Use `surface_container_lowest` with `backdrop-blur-xl`. This ensures the user never feels "blocked" from their conversation.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical padding. A little extra breathing room on the left side of a chat thread creates a premium, airy feel.
*   **Do** use `manrope` for all numerical data (like unread counts) to give them a distinct, modern look.
*   **Do** lean into glassmorphism for top navigation bars so the chat content scrolls beautifully underneath.

### Don't:
*   **Don't** use 1px dividers between messages. It creates visual "noise" that tires the user's eyes.
*   **Don't** use pure black (#000) for Dark Mode. Use `inverse_surface` to keep the palette soft and sophisticated.
*   **Don't** use "Standard" icons. Ensure all icons (Lucide/Heroicons) are set to a consistent `1.5px` or `2px` stroke weight to match the typography's visual weight.

---

## 7. Roundedness Scale Reference
*   **xl (3rem):** Main chat bubbles, input fields, primary containers.
*   **lg (2rem):** User avatars, hovering cards, image attachments.
*   **sm (0.5rem):** Contextual menus, "tucked" corners of chat bubbles.
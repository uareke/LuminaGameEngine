# Advanced Inventory System

This document details the new features of the **Advanced Inventory System** implemented in the Engine, accessible via the `UIComponent`.

The system has been updated to support flexible layouts (Grid) and high-quality border styling (9-Slice/8-Parts).

## 🚀 Key Features

1.  **Customizable Grid**: Freely define the number of rows and columns (e.g., 5x4, 10x2).
2.  **9-Slice System (Borders)**: Assemble complex frames using separate parts (TopLeft, Top, TopRight, etc.), enabling professional retro/pixel-art inventory windows.
3.  **Global Scaling**: Adjust the size of all slots and text with a single scaling factor.
4.  **Editor Integration**: All properties are visually configurable in the editor panel.

---

## 🛠️ Editor Configuration

To configure the advanced inventory:

1.  Select the entity that has the **UIComponent**.
2.  In the Properties Panel, locate the **UI / HUD** section.
3.  Open the **🎨 Advanced Inventory** detail.

### Available Fields

| Property | Description | Default |
| :--- | :--- | :--- |
| **Scale** | Size multiplication factor. Increase for larger inventories (UI Scaling). | `1.0` |
| **Columns** | Number of horizontal slots. | `5` |
| **Rows** | Number of vertical slots. | `4` |

### Border Configuration (9-Slice)

The system allows selecting **8 individual images** to compose the inventory frame. This offers full flexibility for pixel art.

*   **Corners**: `TopLeft`, `TopRight`, `BottomLeft`, `BottomRight`
*   **Sides**: `Top`, `Left`, `Right`, `Bottom` (These images are stretched/repeated to fill the space).
*   **Center**: Filled with the defined background color or transparent if no asset is assigned.

> **Tip**: You can use only borders (e.g., a gold frame) and leave the background transparent to see the game behind it.

---

## 💻 Technical Reference (Scripting)

If you prefer to configure via code (JavaScript), properties are available on the `UIComponent` instance:

```javascript
const ui = entity.obterComponente('UIComponent');

// Grid Configuration
ui.inventoryCols = 8;
ui.inventoryRows = 3;
ui.inventoryScale = 1.5;

// Border Assets Configuration (Asset IDs)
ui.borderTopLeft = 'img_border_tl';
ui.borderTop = 'img_border_t';
ui.borderTopRight = 'img_border_tr';
ui.borderLeft = 'img_border_l';
// ... etc

// Slot Images
ui.imagemSlot = 'img_slot_empty_bg';
ui.imagemSlotCheio = 'img_slot_highlight';
```

## 📐 Rendering Logic

The renderer calculates the total window size based on:

```javascript
TotalWidth = (Columns * SlotSize) + ((Columns - 1) * Spacing) + (Padding * 2)
```

The system draws the **Background** (9-Slice) first, then the **Empty Slots**, then the **Items**, and finally the **Quantity** and **Selection Overlay**.

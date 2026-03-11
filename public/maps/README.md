# Map images for the interactive Explore section

The app loads one SVG per retreat destination:

```
/maps/<destination-slug>.svg
```

**Naming:** Use the destination slug (lowercase, spaces → hyphens), e.g. `panama.svg`, `costa-rica.svg`, `el-salvador.svg`.

---

## Template

| File | Purpose |
|------|---------|
| **`template.svg`** | Base map to duplicate for new retreats. Copy to `<destination-slug>.svg` (e.g. `panama.svg`) and replace art/regions as needed. The app does **not** load `template.svg`; it’s only for creating new maps. |
| **`el-salvador.svg`** | El Salvador retreat map (used when destination slug is `el-salvador`). |
| **`placeholder.svg`** | Fallback / reference; not used by a specific retreat. |

**Adding a new retreat map:** Copy `template.svg` → rename to `<destination-slug>.svg` (e.g. `panama.svg`) → edit in Figma/Illustrator/etc. Pin positions still come from Sanity (Map Position x/y 0–100%).

Pin positions are set in Sanity (SALTY Landmarks → Map Position). See **docs/INTERACTIVE-MAP-WORKFLOW.md** for the full workflow.

# Fabric Image Upload Guide

All files are renamed and ready to upload to your GitHub repo root (`/public` or `/` depending on your setup).

## Upload all files to the root of your site

On GitHub: **Add file → Upload files** → drag all files from the `images/` folder → commit.

## File mapping

### Favicons (root)
| File | Used by |
|------|---------|
| `favicon-16x16.png` | All pages |
| `favicon-32x32.png` | All pages |
| `apple-touch-icon.png` | All pages |

### OG Images — Blog Posts (root)
| File | Source | Used by |
|------|--------|---------|
| `og-clawhub.png` | blog1_fa5.png | post-clawhub.html |
| `og-trust-scoring.png` | blog2_fa2.png | post-trust-scoring.html |
| `og-mcp-timeline.png` | blog3_fa1.png | post-mcp-timeline.html |

### OG Images — Site Pages (root)
| File | Source | Used by |
|------|--------|---------|
| `og-home.png` | FA-08 (Trust Index bold) | index.html |
| `og-default.png` | FA-08 | terms.html, privacy.html, disclaimer.html |
| `og-blog.png` | FA-08 | blog.html |
| `og-docs.png` | FA-08 | docs.html |
| `og-introducing-trust-index.png` | FA-08 | post-trust-index.html |

### OG Images — Future Pages (root)
| File | Source | For |
|------|--------|-----|
| `og-api.png` | FA-09 (API bold) | Future API page |
| `og-payments.png` | FA-10 (x402 bold) | Future payments page |

## No HTML changes needed
All filenames match what your HTML already references. Just upload and they'll work.

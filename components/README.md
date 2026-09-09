# Component architecture

The page is organized around the scroll experience described in the animation brief:

- `Hero3D.tsx` owns the client-only 3D hero visual.
- `ScrollProgress.tsx` exposes document progress.
- `Service3D.tsx` is the animated service-card primitive.
- `Portfolio.tsx` and `Contact.tsx` are page-level entry points.
- `PageLoader.tsx` is the page loading entry point.
- `../animations/` contains section-specific scroll timing contracts.

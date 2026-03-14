# fakeOS — OS-style Portfolio

A minimal, desktop-like portfolio built with React, Vite and Tailwind CSS that showcases apps, a taskbar, window system and a terminal for an interactive résumé.

## Demo

Open the project locally to explore the desktop UI, apps (About, Resume, Projects, Skills, Contact), and the interactive Terminal app.

## Features

- Boot screen and animated desktop background
- Windowing system with draggable windows and taskbar
- Built-in apps: About, Resume, Projects, Skills, Contact, Terminal
- Toast notifications and desktop clock
- Responsive layout and keyboard-friendly interactions

## Tech Stack

- React + JSX
- Vite (development server & build)
- Tailwind CSS for styling

## Quickstart

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

Notes: This project expects a typical Node.js + npm environment. If `npm run dev` fails, ensure you have a recent Node.js version installed (>=16 recommended).

## Project Structure (high-level)

- `index.html` — App entry HTML
- `package.json` — Scripts & dependencies
- `src/` — Source code
  - `main.jsx` — App bootstrap
  - `App.jsx` / `App.css` — Root UI
  - `components/` — Desktop, Taskbar, Window, apps, and UI pieces
  - `hooks/` — Custom hooks (e.g., `useClock`)
  - `store/` — Window state management

## Development notes

- The UI uses Tailwind classes; edit `tailwind.config.js` to change design tokens.
- Windowing behavior is driven by `store/windowStore.js`; for new apps, add a component under `src/components/apps/` and register it where the app launcher is handled.

## Contributing

- Feel free to open issues or PRs to add apps, accessibility improvements, or performance tweaks.

## License

MIT

## Author

Created as a personal OS-style portfolio.

# Campfire Frontend

Dieses Projekt nutzt Vite, React, React Router v6, Tailwind CSS und Mantine zur Erstellung einer modernen Webanwendung.

## Projektstart

1. Klone das Repository und wechsele in das Verzeichnis:

```
git clone https://gitlab.reutlingen-university.de/campfire-project/campfire-frontend.git
cd campfire-frontend
```

2. Installiere die Abhängigkeiten:

```
npm install
```

3. Starte die Entwicklungsumgebung:

```
npm run dev
```

## Befehle

- `npm run dev`: Startet das Projekt im Entwicklungsserver.
- `npm run build`: Erstellt eine Produktionsversion des Projekts.
- `npm run lint`: Prüft das Projekt auf Linter-Fehler.
- `npm run preview`: Vorschau der gebauten App.

## Verwendete Pakete

- **Vite:** Ein Build-Tool, das auf ESM-Modulen basiert und eine schnellere und schlankere Entwicklungserfahrung bietet. [Mehr dazu](https://vitejs.dev/guide/)
- **React:** Eine JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen. [Mehr dazu](https://reactjs.org/docs/getting-started.html)
- **React Router v6:** Die neueste Version des de-facto Routing-Lösung für React. [Mehr dazu](https://reactrouter.com/docs/en/v6)
- **Tailwind CSS:** Ein Utility-First-CSS-Framework zum Erstellen von benutzerdefinierten Designs. [Mehr dazu](https://tailwindcss.com/docs)
- **Mantine:** Ein modernes React-UI-Framework mit Unterstützung für Themen und Serverseitiges Rendering. [Mehr dazu](https://mantine.dev/docs/getting-started/)

## Ordnerstruktur

Die Anwendung hat eine klare und logische Ordnerstruktur, um die Organisation des Codes und die Zusammenarbeit im Team zu erleichtern.

```
campfire-frontend/
└── src/
    ├── assets/
    ├── components/
    ├── styles/
    ├── utils/
    └── pages/
        └── Seite1/
            ├── assets/
            ├── components/
            ├── hooks/
            ├── utils/
            └── Seite1.tsx
```

- **src/**: Dies ist das Hauptverzeichnis für den gesamten Quellcode der Anwendung.
    - **assets/**: Hier befinden sich alle globalen Ressourcen wie Bilder, Icons und Schriftarten.
    - **hooks/**: Hier befinden sich alle globalen Hooks.
    - **components/**: Dieses Verzeichnis enthält alle globalen, wiederverwendbaren React-Komponenten.
    - **styles/**: Hier befinden sich alle globalen Stile, einschließlich der Tailwind CSS-Konfiguration und der zugehörigen Dateien.
    - **utils/**: Dieses Verzeichnis enthält alle globalen Hilfsfunktionen und -klassen.
    - **pages/**: Hier sind alle Seiten der Anwendung untergebracht. Jede Seite hat ihr eigenes Verzeichnis mit der folgenden Struktur:
        - **SeiteX/**: Dies ist das Verzeichnis für eine bestimmte Seite (z.B. "Seite1"). Jedes Seitenverzeichnis kann die folgenden Unterverzeichnisse enthalten:
            - **assets/**: Ressourcen, die nur von dieser Seite verwendet werden.
            - **components/**: React-Komponenten, die nur auf dieser Seite verwendet werden.
            - **hooks/**: React Hooks, die speziell für diese Seite erstellt wurden.
            - **utils/**: Hilfsfunktionen und -klassen, die nur auf dieser Seite verwendet werden.
            - **SeiteX.tsx**: Dies ist die Haupt-TSX-Datei für die Seite.

Diese Struktur hilft dabei, den Code sauber und organisiert zu halten, und macht es leicht, sowohl globale als auch seitenbezogene Ressourcen zu finden und zu verwenden.

## Navigation und Dynamisches Routing

In dieser Anwendung wird die Navigation durch Links in der Navbar gesteuert und das Routing durch React Router v6 gehandhabt. Es ist auch möglich, dynamisches Routing mit Hilfe von URL-Parametern zu verwenden.

### Navigation mit Navbar und Links

Die Navigation innerhalb der Anwendung erfolgt durch die Verwendung von `Link` Komponenten in der Navbar. Ein `Link` nimmt eine `to` Prop, die den Pfad angibt, zu dem es führen soll. 

```jsx
<Link to="/projects">
  <NavLink label="Alle Projekte" className="font-medium" />
</Link>
```

In diesem Fall wird beim Klicken auf "Alle Projekte" zur Route `/projects` navigiert.

### Dynamisches Routing mit React Router v6

React Router ermöglicht es, dynamische Routen zu erstellen. Dabei werden in der `path` Prop der `Route` Komponente Platzhalter in der Form `:parameterName` verwendet. 

```jsx
<Route path="projects/:projectName" element={<App2 />} />
```

In diesem Beispiel ist `:projectName` der Platzhalter, der den dynamischen Teil der URL darstellt. Wenn der Benutzer zu einer URL wie `/projects/Projekt1` navigiert, wird die `App2` Komponente gerendert, und "Projekt1" wird als Wert des `projectName` Parameters bereitgestellt.

### Abrufen von URL-Parametern mit `useParams`

Um auf diese dynamischen Parameter in der gerenderten Komponente zuzugreifen, wird der `useParams` Hook von React Router verwendet. Dieser Hook gibt ein Objekt zurück, das die aktuellen Routenparameter enthält.

```jsx
import { useParams } from 'react-router-dom';

function App2() {
  let { projectName } = useParams();

  return <h2>Projektname: {projectName}</h2>;
}
```

In diesem Beispiel extrahiert der `useParams` Hook den `projectName` Parameter aus der aktuellen Route. Dieser Wert kann dann in der Komponente verwendet werden, beispielsweise um den Projektname in einem `<h2>` Tag zu rendern.

Zusammengefasst erlaubt die Kombination aus `Link` Komponenten, dynamischen Routen und dem `useParams` Hook eine sehr flexible Navigation und Datenübertragung innerhalb der Anwendung.
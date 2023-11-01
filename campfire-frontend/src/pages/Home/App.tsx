import { useEffect, useState } from "react";

function App() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("http://campfire-backend:3000/apps")
      .then((response) => response.json())
      .then((data) => setApps(data));
  }, []);

  return (
    <div>
      {apps.map((app: any) => {
        return (
          <div key={app.name} onClick={() => {}}>
            <p>{app.name}</p>
            <p>Auf folgenden Geräten Verfügbar: {app.compabitility}</p>
            <img src={app.imageURL} />
          </div>
        );
      })}
    </div>
  );
}

export default App;

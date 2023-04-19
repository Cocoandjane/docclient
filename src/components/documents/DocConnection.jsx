import DocHubSignalR from "./DocHubSignalR"

export default function App() {
  const { connection } = DocHubSignalR("http://localhost:7101/r/doc");

  return (
    <div className="App">
      <h1>SignalR Chat</h1>
      <p>{connection ? "Connected" : "Not connected"}</p>
    </div>
  );
}


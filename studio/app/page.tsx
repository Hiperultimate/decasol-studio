"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [programId, setProgramId] = useState("");
  const [logs, setLogs] = useState<any[]>([]);

  const startStream = () => {
    const ws = new WebSocket("ws://localhost:3001/ws");
    ws.onopen = () => ws.send(JSON.stringify({ type: "subscribe", programId }));
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setLogs((prev) => [data, ...prev]);
    };
  };

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Decasol Studio</h1>
      <div style={{ marginTop: 12 }}>
        <input
          placeholder="Enter Program ID"
          value={programId}
          onChange={(e) => setProgramId(e.target.value)}
          style={{ padding: 8, width: 420 }}
        />
        <button onClick={startStream} style={{ marginLeft: 8, padding: '8px 12px' }}>
          Start Streaming
        </button>
      </div>

      <section style={{ marginTop: 20, maxWidth: 920 }}>
        <h2>Transaction Logs</h2>
        <div style={{ marginTop: 8, background: '#f3f4f6', padding: 12, height: 420, overflow: 'auto' }}>
          <ul style={{ fontSize: 12 }}>
            {logs.map((l, i) => (
              <li key={i} style={{ padding: 6, borderBottom: '1px solid #e5e7eb' }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(l.data, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

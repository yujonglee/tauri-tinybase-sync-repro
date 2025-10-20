import { Inspector } from "tinybase/ui-react-inspector";

import { useState } from "react";
import * as store from "./tinybase";

function App() {
  const [value, setValue] = useState("");
  const handleAppend = store.UI.useAddRowCallback(
    "demo",
    (value: string) => ({ value }),
    [],
    store.STORE_ID,
  );

  const table = store.UI.useTable("demo", store.STORE_ID);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Inspector />
      <pre>{JSON.stringify(table, null, 2)}</pre>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: "12px", fontSize: "18px", width: "300px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button
        onClick={() => handleAppend(value)}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Append
      </button>
    </main>
  );
}

export default App;

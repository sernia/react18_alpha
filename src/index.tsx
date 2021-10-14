import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");

// effects *are not* flushed synchronously
// (Same as React 17)
ReactDOM.createRoot(rootElement).render(<App />);

// effects *are* flushed synchronously
// (Same as React 17)
// ReactDOM.render(<App />, rootElement);

import { render } from "preact";
import { App } from "./App.tsx";
import "./styles/normalize.css";
import "./styles/index.css";

render(<App />, document.getElementById("root") as HTMLElement);

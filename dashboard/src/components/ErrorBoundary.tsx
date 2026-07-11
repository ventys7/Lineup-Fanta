import React from "react";
import { createLogger } from "../debug/logger";

const log = createLogger("react-boundary");

type Props = {
  name: string;
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    log.error(`${this.props.name} crashed`, { error, componentStack: info.componentStack });
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <section className="lf-dashboard-card lf-runtime-error" role="alert">
        <strong>Questa sezione non è stata caricata.</strong>
        <p>Ricarica la pagina. Con <code>?debug=1</code> trovi più dettagli nella console.</p>
        <button type="button" onClick={() => window.location.reload()}>Ricarica</button>
      </section>
    );
  }
}

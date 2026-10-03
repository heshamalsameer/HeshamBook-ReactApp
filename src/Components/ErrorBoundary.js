import { Component } from "react";

// Shows the error on screen instead of a blank white page
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }
  reset = () => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("circle-"))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
    window.location.reload();
  };
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ fontFamily: "Roboto, sans-serif", maxWidth: 640, margin: "80px auto", padding: 24 }}>
        <h2 style={{ color: "#1976d2" }}>Something went wrong</h2>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: 16, borderRadius: 12, color: "#b71c1c" }}>
          {String(this.state.error?.stack || this.state.error)}
        </pre>
        <button onClick={this.reset} style={{ padding: "10px 18px", borderRadius: 999, border: 0, background: "#1976d2", color: "#fff", cursor: "pointer" }}>
          Reset saved data &amp; reload
        </button>
      </div>
    );
  }
}

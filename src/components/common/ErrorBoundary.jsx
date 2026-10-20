import { Component } from "react";
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="error-page">
        <h1>Something went wrong</h1>
        <p>Please reload the page to try again.</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Reload application
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}

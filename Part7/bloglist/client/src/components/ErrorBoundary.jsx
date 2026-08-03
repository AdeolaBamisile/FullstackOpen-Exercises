import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("something went wrong", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Something went wrong :(</h2>
          <p>Please make a bug report to mluukkai in Discord</p>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

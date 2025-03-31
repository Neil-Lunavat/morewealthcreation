"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You could log the error to an error reporting service here
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                this.props.fallback || (
                    <div className="p-4 my-8 bg-red-900/20 border border-red-700 rounded-lg text-white max-w-2xl mx-auto">
                        <div className="flex items-center mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
                            <h2 className="text-xl font-bold">
                                Something went wrong
                            </h2>
                        </div>
                        <p className="mb-4 text-neutral-300">
                            {`We're sorry, but there was an error loading this
                            section. Please try refreshing the page.`}
                        </p>
                        {this.state.error && (
                            <div className="p-4 bg-red-950/50 rounded-md mb-4 overflow-auto">
                                <p className="font-mono text-sm text-red-300">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </button>
                            <button
                                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors"
                                onClick={() =>
                                    this.setState({ hasError: false })
                                }
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

/**
 * Component-level error boundary to wrap individual sections
 */
export function SectionErrorBoundary({
    children,
    section,
}: {
    children: ReactNode;
    section: string;
}) {
    return (
        <ErrorBoundary
            fallback={
                <div className="p-5 rounded-lg border border-amber-800/40 bg-amber-900/20 my-4">
                    <h3 className="text-lg font-medium text-amber-200 mb-2 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Section Error
                    </h3>
                    <p className="text-amber-100/90">
                        There was a problem loading the{" "}
                        <strong>{section}</strong> section.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-3 px-3 py-1.5 bg-amber-800/50 hover:bg-amber-700/60 rounded-md text-sm transition-colors"
                    >
                        Retry
                    </button>
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    );
}

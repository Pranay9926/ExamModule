// src/components/DraggableCalculator.js

import React from "react";
import Draggable from "react-draggable";

function DraggableCalculator({ isVisible, closeCalculator }) {
    // Only render the iframe when it's visible
    if (!isVisible) {
        return null;
    }

    return (
        <Draggable handle=".draggable-header" defaultPosition={{ x: 200, y: 300 }}>
            <div
                style={{
                    width: "330px",
                    height: "520px",
                    zIndex: 9999, // Ensure it's on top
                    position: "absolute",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                {/* Draggable Header */}
                <div
                    className="draggable-header"
                    style={{
                        backgroundColor: "#f97316",
                        padding: "10px",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "move", // Shows the move cursor
                        textAlign: "center",
                    }}
                >
                    Scientific Calculator
                    <span
                        style={{
                            float: "right",
                            cursor: "pointer",
                            fontWeight: "bold",
                            marginRight: "10px",
                        }}
                        onClick={closeCalculator} // Click to close
                    >
                        ✖
                    </span>
                </div>

                {/* Calculator Iframe */}
                <iframe
                    src={`${window.location.protocol}//${window.location.host}/scientific-calculator-master/index.html`}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    title="Calculator"
                />
            </div>
        </Draggable>
    );
}

export default DraggableCalculator;

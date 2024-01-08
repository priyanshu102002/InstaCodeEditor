import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
    const [client, setClient] = useState([
        { socketId: "1", userName: "John Doe" },
        { socketId: "2", userName: "Aman" },
        { socketId: "3", userName: "Suman" },
    ]);

    return (
        <div className="editorWrapper">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img src="/code-sync.png" alt="logo" />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientList">
                        {client.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.userName}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn">Copy ROOM ID</button>
                <button className="btn leaveBtn">Leave</button>
            </div>
            <div className="editor">
                <Editor />
            </div>
        </div>
    );
};

export default EditorPage;

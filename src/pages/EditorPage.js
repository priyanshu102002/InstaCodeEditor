import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { initSocket } from "../socket";
import ACTIONS from "../Action";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
    const location = useLocation();
    const socketRef = useRef();
    const reactNavigator = useNavigate();
    const { roomId } = useParams();

    const handleError = (error) => {
        console.log("Socket Error", error);
        toast.error("Socket connection failed, try again latar!");
        reactNavigator("/");
    };

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            socketRef.current.on("connected_error", (error) =>
                handleError(error)
            );
            socketRef.current.on("connected_failed", (error) =>
                handleError(error)
            );

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });
        };
        init();
    }, []);

    const [client, setClient] = useState([
        { socketId: "1", userName: "John Doe" },
        { socketId: "2", userName: "Aman" },
        { socketId: "3", userName: "Suman" },
    ]);

    if (!location.state) {
        <Navigate to="/" />;
    }

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

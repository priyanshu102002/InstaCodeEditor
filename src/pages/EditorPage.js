import React, { useEffect, useRef, useState } from "react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
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

    const [client, setClient] = useState([]);

    const handleError = (error) => {
        console.log("Socket Error", error);
        toast.error("Socket connection failed, try again latar!");
        reactNavigator("/");
    };

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            socketRef.current.on("connect_error", (error) =>
                handleError(error)
            );
            socketRef.current.on("connect_failed", (error) =>
                handleError(error)
            );

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            // Listen for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room!`);
                    }
                    setClient(clients);
                }
            );

            // Listen for disconnect event
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room!`);
                    setClient((prev) =>
                        prev.filter((client) => client.socketId !== socketId)
                    );
                }
            );
        };
        init();

        return () => {
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
            socketRef.current.disconnect();
        };
    }, []);

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
                                username={client.username}
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

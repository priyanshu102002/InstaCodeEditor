import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setUserName] = useState("");
    const navigate = useNavigate();

    const createNewRoom = (event) => {
        event.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        toast.success("Room Created Successfully!");
    };

    const join = () => {
        if (!roomId || !username) {
            toast.error("Please fill all the fields!");
            return;
        }
        // Navigate to the editor page -> to get this we use useLocation hook in EditorPage.js
        navigate(`/editor/${roomId}`, {
            state: { username },
        });
    };

    const enterHandler = (event) => {
        if (event.code === "Enter") {
            join();
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    src="./code-sync.png"
                    className="homePageLogo"
                    alt="code-sync-logo"
                />
                <h4 className="mainLable">Paste Invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        placeholder="ROOM ID"
                        className="inputBox"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={enterHandler}
                    />
                    <input
                        type="text"
                        placeholder="USER NAME"
                        className="inputBox"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                        onKeyUp={enterHandler}
                    />
                    <button className="btn joinBtn" onClick={join}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a
                            onClick={createNewRoom}
                            href="/"
                            className="createNewBtn"
                        >
                            new room
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Built with💛 by{" "}
                    <a href="/https://github.com/priyanshu102002">Priyanshu</a>
                </h4>
            </footer>
        </div>
    );
};

export default HomePage;

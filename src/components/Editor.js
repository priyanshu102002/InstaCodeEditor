import React, { useEffect} from "react";

import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = () => {

    useEffect(() => {
        async function init() {
            CodeMirror.fromTextArea(document.getElementById("realTimeEditor"), {
                mode: { name: "javascript", json: true },
                theme: "dracula",
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                lineWrapping: true,
                scrollbarStyle: "null",
            });
        }
        init();
    }, []);

    return <textarea id="realTimeEditor" />;
};

export default Editor;

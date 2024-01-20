import { javascript } from "@codemirror/lang-javascript";
import { solarizedLight } from "@uiw/codemirror-theme-solarized";
import CodeMirror from "@uiw/react-codemirror";
import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { ACTIONS } from "../../Actions";

const EditorTextarea = ({ socketRef, roomId, onCodeChange }) => {
  const [code, setCode] = useState(null);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setKey(Date.now());
    }, 500);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    const init = () => {
      if (!socketRef.current) return;
      if (code === null) return;
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        code,
      });
    };

    init();
  }, [socketRef.current, code]);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.emit(ACTIONS.SYNC_CODE, {
      roomId,
      socketId: socketRef.current.id,
    });

    socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      if (code !== null) {
        setCode(code);
      }
    });

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  const handleEditorChange = debounce((val) => {
    setCode(val);
    onCodeChange(val);
  }, 50);

  if (!socketRef.current) {
    return (
      <div className="w-full h-screen grid place-content-center">
        <FaSpinner className="animate-spin text-4xl text-pink-500" />
      </div>
    );
  }

  return (
    <div key={key} className="w-full h-screen">
      <CodeMirror
        className="w-full"
        maxWidth="1080px"
        value={code || ""}
        theme={solarizedLight}
        extensions={[javascript({ jsx: true })]}
        onChange={handleEditorChange}
        height="645px"
      />
    </div>
  );
};

export default EditorTextarea;

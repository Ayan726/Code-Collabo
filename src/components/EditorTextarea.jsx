import { javascript } from "@codemirror/lang-javascript";
import { solarizedLight } from "@uiw/codemirror-theme-solarized";
import CodeMirror from "@uiw/react-codemirror";
import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { ACTIONS } from "../../Actions";

const EditorTextarea = ({ socketRef, roomId }) => {
  const [code, setCode] = useState(null);
  const [key, setKey] = useState(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!socketRef.current || mounted) return;
    socketRef.current.emit(ACTIONS.SYNC_CODE, {
      roomId,
      socketId: socketRef.current.id,
    });
    setMounted(true);
  }, [socketRef.current]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setKey(Date.now());
    }, 500);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    let t;
    const init = () => {
      if (!socketRef.current || code === null) return;
      t = setTimeout(() => {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }, 250);
    };

    init();

    return () => {
      if (socketRef.current) clearTimeout(t);
    };
  }, [socketRef.current, code]);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      if (code !== null) {
        console.log("code change");
        setCode(code);
      }
    });

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  const handleEditorChange = debounce((val) => {
    setCode(val);
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

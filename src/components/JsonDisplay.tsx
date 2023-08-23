import "./JsonDisplay.css";
import { FormEvent, Profiler, useEffect, useState } from "react";
import { ClickableJson } from "./ClickableJson";
import { NiceOutput } from "./NiceOutput";

const demoData = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
  ],
};

export const JsonDisplay = () => {
  const [textInput, setTextInput] = useState(JSON.stringify(demoData));
  const [jsonInput, setJsonInput] = useState({});
  const [pathState, setPathState] = useState("res");
  const [showPretty, setShowPretty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState("");

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextInput(e.currentTarget.value);
  };

  useEffect(() => {
    try {
      // JSON.parse() throws hard errors which when unhandled will break the app
      // We use this to our advantage to validate the JSON
      const validated = JSON.parse(textInput);
      setJsonInput(validated);
      setIsValid(true);
    } catch (e) {
      setJsonInput("");
      setIsValid(false);
    }
  }, [textInput]);

  return (
    <section>
      <div>
        <label htmlFor="valText">
          Current Path:
          <br />
          <input
            type="text"
            id="valText"
            name="valText"
            value={pathState}
            className="rounded border border-black px-4"
            readOnly
          ></input>
        </label>
      </div>
      <div>
        <span>{value}</span>
      </div>
      <label htmlFor="jsonInput">
        Place your JSON Below:
        <br />
        <textarea
          name="jsonInput"
          id="jsonInput"
          rows={6}
          cols={50}
          value={textInput}
          onChange={handleInput}
          className={`rounded border border-black px-4`}
        />
      </label>

      <div>
        <label htmlFor="my-checkbox" className="my-checkbox">
          <input
            type="checkbox"
            value="showPretty"
            id="my-checkbox"
            onClick={() => setShowPretty(!showPretty)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"></rect>
            <polyline
              points="216 72.005 104 184 48 128.005"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></polyline>
          </svg>
          <span className="ml-2">Show Readonly Pretty Output</span>
        </label>
      </div>

      <div>
        <ClickableJson
          isValid={isValid}
          data={jsonInput}
          setPathState={setPathState}
          setValue={setValue}
        />
      </div>

      {showPretty && (
        <>
          <NiceOutput
            isValid={isValid}
            stringified={JSON.stringify(jsonInput, null, 2)}
          />
        </>
      )}
    </section>
  );
};

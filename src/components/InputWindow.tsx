import { FormEvent, useEffect, useState } from "react";
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

export const InputWindow = () => {
  const [textInput, setTextInput] = useState(JSON.stringify(demoData));
  const [jsonInput, setJsonInput] = useState({});
  const [pathState, setPathState] = useState("res");
  const [showPretty, setShowPretty] = useState(false);
  const [isValid, setIsValid] = useState(true);

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
    <div className={`flex h-24 w-72 flex-col gap-6 text-left`}>
      <div>
        {showPretty && (
          <NiceOutput
            isValid={isValid}
            stringified={JSON.stringify(jsonInput, null, 2)}
          />
        )}
      </div>
      <label htmlFor="valText">
        <input type="text" id="valText" value={pathState} readOnly></input>
      </label>
      <label htmlFor="jsonInput">Place your JSON Below:</label>
      <textarea
        name="jsonInput"
        rows={6}
        cols={50}
        value={textInput}
        onChange={handleInput}
        className={`${!isValid && "rounded border border-red-400"} px-4`}
      />
      <label htmlFor="showPretty">Show Pretty Output</label>
      <input
        type="checkbox"
        value="showPretty"
        id="showPretty"
        onClick={() => setShowPretty(!showPretty)}
      />
      <ClickableJson
        isValid={isValid}
        data={jsonInput}
        setPathState={setPathState}
      />
    </div>
  );
};

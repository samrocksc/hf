import { FormEvent, useEffect, useState } from "react";
import { isValueScalar, JSONValue } from "./helpers";

export const JsonInterpreter = () => {
  return <InputWindow />;
};

const demoData = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
      optional: {
        field: "test",
      },
    },
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
          <ShowNiceOutput
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

export const ClickableJson: React.FC<{
  isValid: Readonly<boolean>;
  data: JSONValue;
  setPathState: (input: string) => void;
}> = ({ data, setPathState }) => {
  return (
    <>
      <h2>Response:</h2>
      <div className="w-96 rounded-sm border-2 border-white bg-white text-left text-black">
        <pre>
          <code>
            <RenderJson data={data} setPathState={setPathState} />
          </code>
        </pre>
      </div>
    </>
  );
};

export const RenderJson: React.FC<{
  data: JSONValue;
  setPathState: (input: string) => void;
  currentPath?: string;
  arrayObj?: number;
  indentation?: number;
}> = ({
  currentPath = "res",
  data,
  setPathState,
  arrayObj,
  indentation = 0,
}) => {
  const indent = Array(indentation).join(" ");
  return (
    Object.entries(data).map(([key, value]) => {
      // handle object
      if (typeof value === "object" && !value.length) {
        return (
          <div key={`${key}.${value}`} className="">
            {indent}
            <span>
              {!arrayObj && `${key}: `}
              {"{"}
            </span>
            <RenderJson
              currentPath={
                (!arrayObj && currentPath + `.${key}`) || currentPath
              }
              data={value}
              indentation={indentation + 4}
              setPathState={setPathState}
            />
            {indent}
            <span>{"},"}</span>
          </div>
        );
      }
      // handle array
      if (typeof value === "object" && value.length) {
        return (
          <div key={key}>
            <span>
              {key}: {"["}
            </span>
            <RenderJson
              data={value}
              currentPath={currentPath + `.[${arrayObj || 0}]`}
              arrayObj={(arrayObj || 0) + 1}
              indentation={indentation + 4}
              setPathState={setPathState}
            />
            {indent}
            <span>{"],"}</span>
          </div>
        );
      }
      // handle primitives
      if (isValueScalar(value)) {
        return (
          <div key={value}>
            {indent}
            <span
              onClick={() => setPathState(`${currentPath}.${key}`)}
              className="text-blue-500"
            >
              "{key}":{" "}
            </span>
            <span>{value.toString()},</span>
          </div>
        );
      }
    }) || <></>
  );
};

export const ShowNiceOutput: React.FC<{
  isValid: boolean;
  stringified: JSONValue;
}> = ({ isValid, stringified }) => (
  <>
    <div className="text-left">
      {isValid ? (
        <pre>
          <code>{stringified.toString()}</code>
        </pre>
      ) : (
        <></>
      )}
    </div>
  </>
);

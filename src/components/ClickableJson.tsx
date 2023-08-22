import { JSONValue } from "../helpers";
import { RenderJson } from "./RenderJson";

export const ClickableJson: React.FC<{
  isValid: Readonly<boolean>;
  data: JSONValue;
  setPathState: (input: string) => void;
  setValue: (input: string) => void;
}> = ({ data, setPathState, setValue }) => {
  return (
    <>
      <h2>Response:</h2>
      <div className="pretty">
        <pre>
          <code>
            <RenderJson
              data={data}
              setPathState={setPathState}
              setValue={setValue}
            />
          </code>
        </pre>
      </div>
    </>
  );
};

import { JSONValue } from "../helpers";
import { RenderJson } from "./RenderJson";

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

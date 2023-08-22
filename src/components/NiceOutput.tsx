import { JSONValue } from "../helpers";

export const NiceOutput: React.FC<{
  isValid: boolean;
  stringified: JSONValue;
}> = ({ isValid, stringified }) => (
  <>
    <h2>Pretty Output</h2>
    <div className="pretty">
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

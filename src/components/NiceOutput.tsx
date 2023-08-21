import { JSONValue } from "../helpers";

export const NiceOutput: React.FC<{
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

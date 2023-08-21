import { isValueScalar, JSONValue } from "../helpers";

export const RenderJson: React.FC<{
  data: JSONValue;
  setPathState: (input: string) => void;
  setValue: (input: string) => void;
  currentPath?: string;
  arrayObj?: number;
  indentation?: number;
}> = ({
  currentPath = "res",
  data,
  setPathState,
  setValue,
  arrayObj,
  indentation = 0,
}) => {
  const indent = Array(indentation).join(" ");
  const handleClick = (state: string, value: string) => {
    setPathState(state);
    setValue(value);
  };
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
              setValue={setValue}
            />
            {indent}
            <span>{"},"}</span>
          </div>
        );
      }
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
              setValue={setValue}
            />
            {indent}
            <span>{"],"}</span>
          </div>
        );
      }
      if (isValueScalar(value)) {
        return (
          <div key={value}>
            {indent}
            <span
              onClick={() =>
                handleClick(`${currentPath}.${key}`, value.toString())
              }
              className="cursor-pointer text-blue-500"
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

export const sampleData = {
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

/* for in on an object shows the keys */
for (const x in sampleData) {
  console.log(sampleData[x]);
}

export const isValueScalar = (value: JSONValue) => {
  return (
    (typeof value === "string" ||
      typeof value === "numbesr" ||
      typeof value === "boolean") &&
    value
  );
};

type JSONValue =
  | string
  | number
  | boolean
  | { [key: string]: JSONValue }
  | Array<JSONValue>;

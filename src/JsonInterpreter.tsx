import { JsonDisplay } from "./components/JsonDisplay";

/**
 * In all actuality this is probably just going to be the data container for the component.
 * The presentation layers all residing inside of components.
 *
 * For such a small project, I didn't really feel the need to break down folder structure any more.
 */
export const JsonInterpreter = () => {
  return <JsonDisplay />;
};
